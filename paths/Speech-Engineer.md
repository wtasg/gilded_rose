# Phase 0 — Mathematical Foundations

## Linear Algebra

### Topics

* [ ] Scalars, vectors, matrices, tensors
* [ ] Matrix multiplication
* [ ] Dot product
* [ ] Matrix transpose
* [ ] Linear transformations
* [ ] Vector spaces
* [ ] Basis and dimensionality
* [ ] Orthogonality
* [ ] Eigenvalues and eigenvectors
* [ ] Singular Value Decomposition (SVD)
* [ ] Low-rank approximations

### Resources

* https://www.3blue1brown.com/topics/linear-algebra
* https://www.khanacademy.org/math/linear-algebra
* https://www.deeplearningbook.org

---

## Calculus

### Topics

* [ ] Limits
* [ ] Derivatives
* [ ] Partial derivatives
* [ ] Chain rule
* [ ] Gradients
* [ ] Jacobians
* [ ] Optimization intuition

### Resources

* https://www.khanacademy.org/math/calculus-1
* https://www.3blue1brown.com/topics/calculus

---

## Probability & Statistics

### Topics

* [ ] Probability basics
* [ ] Conditional probability
* [ ] Bayes theorem
* [ ] Gaussian distributions
* [ ] Maximum likelihood estimation
* [ ] Entropy
* [ ] Cross entropy
* [ ] KL divergence
* [ ] Hypothesis testing

### Resources

* https://www.khanacademy.org/math/statistics-probability
* https://seeing-theory.brown.edu

---

# Phase 1 — Digital Signal Processing (DSP)

## Audio Fundamentals

### Topics

* [ ] Sound waves
* [ ] Sampling rate
* [ ] Nyquist theorem
* [ ] Quantization
* [ ] PCM encoding
* [ ] Bit depth
* [ ] Signal-to-noise ratio

### Resources

* https://brianmcfee.net/dstbook-site/content/intro.html
* https://speech.zone

---

## Signal Processing

### Topics

* [ ] Convolution
* [ ] Correlation
* [ ] FIR filters
* [ ] IIR filters
* [ ] Window functions
* [ ] Fourier Transform
* [ ] Fast Fourier Transform (FFT)
* [ ] Short-Time Fourier Transform (STFT)
* [ ] Spectrograms
* [ ] Mel Spectrograms
* [ ] MFCCs

### Resources

* https://www.dspguide.com
* https://speech.zone/courses/speech-processing

---

## Noise Reduction

### Topics

* [ ] Spectral subtraction
* [ ] Wiener filtering
* [ ] Echo cancellation
* [ ] Beamforming
* [ ] Noise suppression

### Resources

* https://webrtc.org
* https://github.com/wiseman/py-webrtcvad

---

# Phase 2 — Speech Processing

## Voice Activity Detection (VAD)

### Topics

* [ ] Energy-based VAD
* [ ] Zero Crossing Rate
* [ ] Statistical VAD
* [ ] GMM-based VAD
* [ ] WebRTC VAD
* [ ] CNN-based VAD
* [ ] CRNN-based VAD
* [ ] Silero VAD
* [ ] Transformer VAD

### Metrics

* [ ] Precision
* [ ] Recall
* [ ] F1 Score
* [ ] False positives
* [ ] False negatives

### Resources

* https://github.com/snakers4/silero-vad
* https://github.com/wiseman/py-webrtcvad
* https://arxiv.org

---

# Phase 3 — Machine Learning

## Core Machine Learning

### Topics

* [ ] Linear Regression
* [ ] Logistic Regression
* [ ] Decision Trees
* [ ] Random Forests
* [ ] Gradient Boosting
* [ ] Feature Engineering

### Resources

* https://scikit-learn.org/stable/tutorial/index.html
* https://www.coursera.org/learn/machine-learning

---

## Optimization

### Topics

* [ ] Gradient Descent
* [ ] Stochastic Gradient Descent
* [ ] Momentum
* [ ] RMSProp
* [ ] Adam
* [ ] Learning Rate Scheduling

### Resources

* https://d2l.ai
* https://cs231n.github.io

---

# Phase 4 — Deep Learning

## Neural Networks

### Topics

* [ ] Perceptrons
* [ ] MLPs
* [ ] Activation Functions
* [ ] Backpropagation
* [ ] Loss Functions

### Resources

* https://www.deeplearningbook.org
* https://cs231n.stanford.edu

---

## CNNs

### Topics

* [ ] Convolutions
* [ ] Pooling
* [ ] Feature Extraction
* [ ] Residual Networks

### Resources

* https://cs231n.stanford.edu

---

## Sequence Models

### Topics

* [ ] RNNs
* [ ] LSTMs
* [ ] GRUs
* [ ] Sequence-to-Sequence Models

### Resources

* https://d2l.ai

---

# Phase 5 — Transformers

## Attention

### Topics

* [ ] Query / Key / Value
* [ ] Self Attention
* [ ] Multi Head Attention
* [ ] Positional Encoding
* [ ] Attention Complexity

### Resources

* https://jalammar.github.io/illustrated-transformer
* https://arxiv.org/abs/1706.03762

---

## Architectures

### Topics

* [ ] Encoder-only Models
* [ ] Decoder-only Models
* [ ] Encoder-Decoder Models
* [ ] BERT
* [ ] GPT
* [ ] T5
* [ ] Whisper

### Resources

* https://huggingface.co/learn
* https://transformers-book.com

---

# Phase 6 — Automatic Speech Recognition (ASR)

## Traditional ASR

### Topics

* [ ] Hidden Markov Models
* [ ] Gaussian Mixture Models
* [ ] WFST Decoding

### Resources

* https://kaldi-asr.org

---

## Modern ASR

### Topics

* [ ] Connectionist Temporal Classification (CTC)
* [ ] RNN-T
* [ ] Attention-based ASR
* [ ] Beam Search
* [ ] Streaming ASR

### Resources

* https://distill.pub
* https://arxiv.org

---

## Whisper

### Topics

* [ ] Whisper Architecture
* [ ] Audio Chunking
* [ ] Mel Spectrogram Pipeline
* [ ] Timestamp Prediction
* [ ] Beam Search Decoding
* [ ] Whisper-JAX

### Resources

* https://github.com/openai/whisper
* https://github.com/sanchit-gandhi/whisper-jax
* https://huggingface.co/learn/audio-course

---

# Phase 7 — NLP for ASR Correction

## Language Processing

### Topics

* [ ] Tokenization
* [ ] Lemmatization
* [ ] Language Models
* [ ] N-grams
* [ ] Contextual Correction

### Resources

* https://web.stanford.edu/~jurafsky/slp3
* https://huggingface.co/learn

---

## Error Correction

### Topics

* [ ] Spell Correction
* [ ] Language Model Rescoring
* [ ] Beam Rescoring
* [ ] WER Reduction

### Resources

* https://speech.zone

---

# Phase 8 — LLM Evaluation

## Metrics

### Topics

* [ ] Perplexity
* [ ] BLEU
* [ ] ROUGE
* [ ] BERTScore
* [ ] MMLU
* [ ] GSM8K
* [ ] Human Evaluation

### Resources

* https://huggingface.co/spaces/evaluate-metric
* https://arxiv.org

---

# Phase 9 — Inference and Model Serving

## Performance Engineering

### Topics

* [ ] P50 Latency
* [ ] P95 Latency
* [ ] P99 Latency
* [ ] Throughput
* [ ] Benchmarking

### Resources

* https://developer.nvidia.com/triton-inference-server
* https://docs.vllm.ai

---

## Optimization

### Topics

* [ ] Quantization
* [ ] Distillation
* [ ] Dynamic Batching
* [ ] Speculative Decoding
* [ ] KV Cache

### Resources

* https://docs.vllm.ai
* https://onnxruntime.ai

---

## GPU Fundamentals

### Topics

* [ ] CUDA Basics
* [ ] GPU Memory Hierarchy
* [ ] Tensor Cores
* [ ] Mixed Precision

### Resources

* https://developer.nvidia.com/cuda-zone
* https://docs.nvidia.com

---

# Phase 10 — Distributed Systems for AI

## Networking

### Topics

* [ ] TCP/IP
* [ ] HTTP
* [ ] REST
* [ ] gRPC
* [ ] WebSockets

### Resources

* https://roadmap.sh/backend
* https://grpc.io/docs

---

## Scaling

### Topics

* [ ] Load Balancing
* [ ] Horizontal Scaling
* [ ] Autoscaling
* [ ] Sharding
* [ ] Replication

### Resources

* https://www.educative.io/courses/grokking-the-system-design-interview
* https://aws.amazon.com/architecture

---

## Messaging

### Topics

* [ ] Kafka
* [ ] RabbitMQ
* [ ] Redis Streams

### Resources

* https://kafka.apache.org/documentation
* https://redis.io/docs

---

# Phase 11 — MLOps

## Data & Experiments

### Topics

* [ ] Dataset Versioning
* [ ] Experiment Tracking
* [ ] Hyperparameter Tuning
* [ ] Data Drift

### Resources

* https://mlflow.org
* https://dvc.org

---

## Deployment

### Topics

* [ ] Docker
* [ ] Kubernetes
* [ ] GPU Scheduling
* [ ] CI/CD

### Resources

* https://kubernetes.io/docs/tutorials
* https://docs.docker.com

---

## Monitoring

### Topics

* [ ] Metrics
* [ ] Logging
* [ ] Tracing
* [ ] Model Drift Detection

### Resources

* https://prometheus.io/docs
* https://grafana.com/docs

---

# Phase 12 — Advanced Speech AI

## Speaker Modeling

### Topics

* [ ] Speaker Embeddings
* [ ] x-vectors
* [ ] d-vectors
* [ ] Speaker Verification

### Resources

* https://speechbrain.github.io
* https://github.com/speechbrain/speechbrain

---

## Speech Generation

### Topics

* [ ] Text-to-Speech
* [ ] Voice Cloning
* [ ] Speech Synthesis
* [ ] Multilingual TTS

### Resources

* https://coqui.ai
* https://github.com/coqui-ai/TTS

---

## Modern Speech Foundation Models

### Topics

* [ ] Wav2Vec2
* [ ] HuBERT
* [ ] SeamlessM4T
* [ ] Speech LLMs
* [ ] Latent Space Decomposition
* [ ] Content vs Speaker Separation

### Resources

* https://huggingface.co/learn/audio-course
* https://ai.meta.com/research/seamless-communication

---

# Phase 13: Research Papers and make these mandatory reads:

* [ ] Attention Is All You Need
* [ ] Whisper
* [ ] Wav2Vec 2.0
* [ ] HuBERT
* [ ] Conformer
* [ ] RNN-Transducer
* [ ] SpecAugment
* [ ] LoRA
* [ ] FlashAttention
* [ ] vLLM (PagedAttention)
* [ ] Silero VAD implementation
* [ ] WebRTC VAD source code
* [ ] Kaldi ASR architecture

Those papers cover a disproportionate amount of what senior ASR engineers tend to discuss in interviews.

---

# Portfolio Projects

## Beginner

* [ ] Build energy-based VAD
* [ ] Build WebRTC-based VAD
* [ ] Build audio denoiser
* [ ] Visualize spectrograms

---

## Intermediate

* [ ] Train custom VAD
* [ ] Build Whisper API
* [ ] Streaming speech-to-text service
* [ ] WER benchmarking suite

---

## Advanced

* [ ] Reproduce Whisper-JAX pipeline
* [ ] Build low-latency ASR system (<1s p95)
* [ ] Build multilingual speech assistant
* [ ] Build speech model evaluation framework
* [ ] Benchmark STT systems under load
* [ ] Deploy speech stack on Kubernetes

---

# Interview Readiness Checklist

* [ ] Can implement gradient descent from scratch
* [ ] Can explain self-attention mathematically
* [ ] Can explain encoder vs decoder architectures
* [ ] Can explain Whisper end-to-end
* [ ] Can explain WebRTC VAD internals
* [ ] Can compute WER manually
* [ ] Can discuss latency optimization techniques
* [ ] Can benchmark ASR systems
* [ ] Can discuss distributed inference architectures
* [ ] Can explain speech foundation models
