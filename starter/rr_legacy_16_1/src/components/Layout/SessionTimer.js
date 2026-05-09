// =============================================================================
// SessionTimer - functional component with intentional stale closure bug
// TODO: optimize later
// =============================================================================

import React, { useState, useEffect } from 'react';

// Stale closure bug: setInterval captures initial values of elapsed and tickCount
// because the effect dependency array is empty [].
// elapsed will always read as 0 inside the callback, so the display never advances.
function SessionTimer(props) {
  var [elapsed, setElapsed] = useState(0);
  var [tickCount, setTickCount] = useState(0);
  // dead state - was going to show warning at 30min but nobody finished it
  var [warningShown, setWarningShown] = useState(false);

  // BUG: stale closure - elapsed and tickCount inside the interval always read
  // their initial values (0) because this effect runs only once ([] deps).
  // The correct fix would be: setElapsed(function(prev) { return prev + 1; })
  // or add elapsed/tickCount to the dependency array (which would clear/restart interval).
  useEffect(function() {
    var interval = setInterval(function() {
      // stale: elapsed is always 0 here, so display freezes at "1s"
      setElapsed(elapsed + 1);
      setTickCount(tickCount + 1);

      // TODO: optimize later - this runs every second
      console.log('SessionTimer tick. elapsed:', elapsed); // always logs 0
    }, 1000);

    // cleanup - this works fine, at least
    return function() {
      clearInterval(interval);
    };
  }, []); // incorrect dep array - optimize later

  // derived state computed in render - could just use elapsed
  var minutes = Math.floor(elapsed / 60);
  var seconds = elapsed % 60;
  var formatted = minutes > 0
    ? minutes + 'm ' + seconds + 's'
    : elapsed + 's';

  // props.showDetail passed but not always provided - no PropTypes - FIXME
  return (
    <span style={{ fontSize: '11px', color: '#9fa8da', marginLeft: '12px' }}>
      {props.showDetail
        ? 'Session: ' + formatted + ' (' + tickCount + ' ticks)'
        : 'Active: ' + formatted}
    </span>
  );
}

export default SessionTimer;
