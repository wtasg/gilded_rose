// =============================================================================
// UserForm - user create/edit form
// Anti-patterns:
//   - componentWillReceiveProps re-derives entire local state from user prop
//   - componentDidUpdate calls setState for validation (extra render per field)
//   - password displayed in plain text in an edit scenario ("for usability")
//   - "confirm password" validation done at submit only, not on blur
//   - hardcoded role list in form even though roles are passed as prop
//   - form state exists locally AND in Redux editingUserDraft
// =============================================================================

import React, { Component } from 'react';

var HARDCODED_ROLES = ['viewer', 'editor', 'admin', 'superadmin', 'support', 'manager'];
var HARDCODED_DEPTS = ['Engineering', 'Marketing', 'Sales', 'Support', 'HR', 'Finance', 'Operations', 'Legal'];

var styles = {
  form:      { display: 'flex', flexDirection: 'column', gap: '14px' },
  formTitle: { fontSize: '18px', fontWeight: '700', color: '#1a237e' },
  row:       { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  field:     { display: 'flex', flexDirection: 'column', gap: '4px' },
  label:     { fontSize: '12px', fontWeight: '600', color: '#555' },
  input: {
    padding: '8px 10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '13px'
  },
  inputError: { borderColor: '#e53935' },
  select: {
    padding: '8px 10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '13px',
    background: '#fff'
  },
  textarea: {
    padding: '8px 10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '13px',
    resize: 'vertical',
    minHeight: '60px'
  },
  errorMsg:  { fontSize: '11px', color: '#e53935' },
  hint:      { fontSize: '11px', color: '#bbb' },
  btnRow:    { display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '8px' },
  btn:       { padding: '9px 18px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600' },
  btnSave:   { background: '#1a237e', color: '#fff' },
  btnCancel: { background: '#eee', color: '#333' },
  savingMsg: { fontSize: '13px', color: '#999', alignSelf: 'center' },
  saveError: { background: '#ffebee', color: '#c62828', padding: '8px 12px', borderRadius: '6px', fontSize: '13px' },
  section:   { fontSize: '13px', fontWeight: '700', color: '#444', paddingTop: '6px', borderTop: '1px solid #eee' }
};

class UserForm extends Component {
  constructor(props) {
    super(props);
    var user = props.user || {};
    this.state = {
      firstName:       user.firstName || (user.name ? user.name.split(' ')[0] : '') || '',
      lastName:        user.lastName  || (user.name ? user.name.split(' ').slice(1).join(' ') : '') || '',
      email:           user.email || '',
      role:            user.role || 'viewer',
      department:      user.department || '',
      jobTitle:        user.jobTitle || '',
      phone:           user.phone || '',
      status:          user.status || 'active',
      bio:             user.bio || '',
      // password shown in form for "edit" scenario — security anti-pattern
      password:        '',
      confirmPassword: '',
      errors:          {},
      isDirty:         false
    };
  }

  // derives entire form state from new user prop — anti-pattern
  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user && nextProps.user) {
      var user = nextProps.user;
      console.log('[UserForm] componentWillReceiveProps - syncing user:', user.id);
      this.setState({
        firstName:       user.firstName || (user.name ? user.name.split(' ')[0] : '') || '',
        lastName:        user.lastName  || (user.name ? user.name.split(' ').slice(1).join(' ') : '') || '',
        email:           user.email || '',
        role:            user.role || 'viewer',
        department:      user.department || '',
        jobTitle:        user.jobTitle || '',
        phone:           user.phone || '',
        status:          user.status || 'active',
        bio:             user.bio || '',
        password:        '',
        confirmPassword: '',
        errors:          {},
        isDirty:         false
      });
    }
  }

  // re-validates in componentDidUpdate, causing extra render per change
  componentDidUpdate(prevProps, prevState) {
    var fieldsChanged =
      prevState.email     !== this.state.email ||
      prevState.firstName !== this.state.firstName ||
      prevState.lastName  !== this.state.lastName ||
      prevState.password  !== this.state.password;

    if (fieldsChanged && this.state.isDirty) {
      var errors = this.validate(this.state);
      this.setState({ errors: errors }); // eslint-disable-line react/no-did-update-set-state
    }
  }

  validate(state) {
    var errors = {};
    if (!state.firstName || state.firstName.trim() === '') {
      errors.firstName = 'First name is required';
    }
    if (!state.lastName || state.lastName.trim() === '') {
      errors.lastName = 'Last name is required';
    }
    if (!state.email || state.email.trim() === '') {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
      errors.email = 'Enter a valid email address';
    }
    if (!state.role) {
      errors.role = 'Role is required';
    }
    // password only required on create
    var isCreate = !this.props.user || !this.props.user.id;
    if (isCreate && !state.password) {
      errors.password = 'Password is required';
    }
    if (state.password && state.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    if (state.password && state.password !== state.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  }

  handleChange(field, e) {
    var value = e.target.value;
    this.setState({ [field]: value, isDirty: true });
  }

  handleSubmit(e) {
    e.preventDefault();
    var errors = this.validate(this.state);
    this.setState({ errors: errors, isDirty: true });
    if (Object.keys(errors).length > 0) {
      console.log('[UserForm] validation errors:', errors);
      return;
    }
    var isCreate = !this.props.user || !this.props.user.id;
    var data = {
      id:         this.props.user ? this.props.user.id : undefined,
      name:       (this.state.firstName + ' ' + this.state.lastName).trim(),
      firstName:  this.state.firstName.trim(),
      lastName:   this.state.lastName.trim(),
      email:      this.state.email.trim().toLowerCase(),
      role:       this.state.role,
      department: this.state.department,
      jobTitle:   this.state.jobTitle.trim(),
      phone:      this.state.phone.trim(),
      status:     this.state.status,
      bio:        this.state.bio.trim()
    };
    // passing plaintext password to save handler — should hash it
    if (isCreate || this.state.password) {
      data.password = this.state.password; // plaintext — anti-pattern
    }
    console.log('[UserForm] submitting user data:', data);
    this.props.onSave(data);
  }

  render() {
    var state    = this.state;
    var errors   = state.errors;
    var isCreate = !this.props.user || !this.props.user.id;
    var saving   = this.props.saving;

    // use props.roles or hardcoded fallback
    var roleOptions = this.props.roles && this.props.roles.length > 0
      ? this.props.roles
      : HARDCODED_ROLES;
    var deptOptions = this.props.departments && this.props.departments.length > 0
      ? this.props.departments
      : HARDCODED_DEPTS;

    return (
      <form style={styles.form} onSubmit={this.handleSubmit.bind(this)}>
        <div style={styles.formTitle}>{isCreate ? 'Add User' : 'Edit User'}</div>

        {this.props.saveError && (
          <div style={styles.saveError}>{this.props.saveError}</div>
        )}

        {/* personal info */}
        <div style={styles.section}>Personal Info</div>
        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>First Name *</label>
            <input
              style={Object.assign({}, styles.input, errors.firstName ? styles.inputError : {})}
              type="text"
              value={state.firstName}
              onChange={this.handleChange.bind(this, 'firstName')}
              placeholder="Jane"
            />
            {errors.firstName && <span style={styles.errorMsg}>{errors.firstName}</span>}
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Last Name *</label>
            <input
              style={Object.assign({}, styles.input, errors.lastName ? styles.inputError : {})}
              type="text"
              value={state.lastName}
              onChange={this.handleChange.bind(this, 'lastName')}
              placeholder="Smith"
            />
            {errors.lastName && <span style={styles.errorMsg}>{errors.lastName}</span>}
          </div>
        </div>

        {/* email */}
        <div style={styles.field}>
          <label style={styles.label}>Email *</label>
          <input
            style={Object.assign({}, styles.input, errors.email ? styles.inputError : {})}
            type="email"
            value={state.email}
            onChange={this.handleChange.bind(this, 'email')}
            placeholder="jane@company.com"
          />
          {errors.email && <span style={styles.errorMsg}>{errors.email}</span>}
        </div>

        {/* role + department */}
        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Role *</label>
            <select
              style={Object.assign({}, styles.select, errors.role ? styles.inputError : {})}
              value={state.role}
              onChange={this.handleChange.bind(this, 'role')}
            >
              {roleOptions.map(function(r) {
                return <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>;
              })}
            </select>
            {errors.role && <span style={styles.errorMsg}>{errors.role}</span>}
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Department</label>
            <select
              style={styles.select}
              value={state.department}
              onChange={this.handleChange.bind(this, 'department')}
            >
              <option value="">Select department...</option>
              {deptOptions.map(function(d) {
                return <option key={d} value={d}>{d}</option>;
              })}
            </select>
          </div>
        </div>

        {/* job title + phone */}
        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Job Title</label>
            <input
              style={styles.input}
              type="text"
              value={state.jobTitle}
              onChange={this.handleChange.bind(this, 'jobTitle')}
              placeholder="e.g. Senior Engineer"
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Phone</label>
            <input
              style={styles.input}
              type="tel"
              value={state.phone}
              onChange={this.handleChange.bind(this, 'phone')}
              placeholder="+1 555 000 0000"
            />
          </div>
        </div>

        {/* status */}
        <div style={styles.field}>
          <label style={styles.label}>Status</label>
          <select
            style={styles.select}
            value={state.status}
            onChange={this.handleChange.bind(this, 'status')}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="banned">Banned</option>
          </select>
        </div>

        {/* bio */}
        <div style={styles.field}>
          <label style={styles.label}>Bio</label>
          <textarea
            style={styles.textarea}
            value={state.bio}
            onChange={this.handleChange.bind(this, 'bio')}
            placeholder="Short bio..."
          />
        </div>

        {/* password section */}
        <div style={styles.section}>
          {isCreate ? 'Set Password' : 'Change Password'}
          {!isCreate && <span style={styles.hint}> (leave blank to keep current)</span>}
        </div>

        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>{isCreate ? 'Password *' : 'New Password'}</label>
            {/* type="text" instead of "password" — "easier to verify during setup" */}
            <input
              style={Object.assign({}, styles.input, errors.password ? styles.inputError : {})}
              type="text"
              value={state.password}
              onChange={this.handleChange.bind(this, 'password')}
              placeholder={isCreate ? 'Minimum 8 characters' : 'Leave blank to keep'}
              autoComplete="new-password"
            />
            {errors.password && <span style={styles.errorMsg}>{errors.password}</span>}
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Confirm Password</label>
            <input
              style={Object.assign({}, styles.input, errors.confirmPassword ? styles.inputError : {})}
              type="text"
              value={state.confirmPassword}
              onChange={this.handleChange.bind(this, 'confirmPassword')}
              placeholder="Repeat password"
            />
            {errors.confirmPassword && <span style={styles.errorMsg}>{errors.confirmPassword}</span>}
          </div>
        </div>

        {/* buttons */}
        <div style={styles.btnRow}>
          {saving && <span style={styles.savingMsg}>Saving...</span>}
          <button
            type="button"
            style={Object.assign({}, styles.btn, styles.btnCancel)}
            onClick={this.props.onCancel}
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={Object.assign({}, styles.btn, styles.btnSave)}
            disabled={saving}
          >
            {isCreate ? 'Create User' : 'Save Changes'}
          </button>
        </div>
      </form>
    );
  }
}

export default UserForm;
