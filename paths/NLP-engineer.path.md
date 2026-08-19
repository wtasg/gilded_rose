# NLP & ML Systems Engineer: 26-Week Career Roadmap

A first-principles, systems-focused curriculum designed to take an experienced software engineer to top-tier AI labs (e.g., Anthropic, Google DeepMind) as an NLP / ML Systems Engineer.

---

# Phase 0 — Mathematical Foundations

## Linear Algebra

### Topics
* [ ] Scalars, vectors, matrices, tensors
* [ ] Matrix multiplication & inner/outer products
* [ ] Matrix transpose and inverses
* [ ] Vector spaces, basis, and span
* [ ] Linear transformations & projections
* [ ] Dot product & cosine similarity
* [ ] Norms ($L_1$, $L_2$, Frobenius)
* [ ] Matrix rank and trace
* [ ] Eigenvalues and eigenvectors
* [ ] Singular Value Decomposition (SVD)
* [ ] Low-rank matrix approximations (PCA, Truncated SVD)

### Resources
* [3Blue1Brown: Essence of Linear Algebra](https://www.3blue1brown.com/topics/linear-algebra)
* [Khan Academy: Linear Algebra](https://www.khanacademy.org/math/linear-algebra)
* [Mathematics for Machine Learning (MML Book)](https://mml-book.github.io)

---

## Calculus & Optimization

### Topics
* [ ] Scalar and multivariate limits
* [ ] Derivatives and partial derivatives
* [ ] Chain rule for multivariate functions
* [ ] Gradients, Jacobians, and Hessians
* [ ] Matrix calculus derivatives ($\frac{\partial L}{\partial \mathbf{W}}$, $\frac{\partial L}{\partial \mathbf{x}}$)
* [ ] Gradient Descent and Stochastic Gradient Descent (SGD)
* [ ] Momentum, RMSProp, and Adam optimizers
* [ ] Learning rate schedulers (Cosine decay, linear warmup)
* [ ] Convex vs. non-convex optimization intuition

### Resources
* [Khan Academy: Calculus 1](https://www.khanacademy.org/math/calculus-1)
* [3Blue1Brown: Essence of Calculus](https://www.3blue1brown.com/topics/calculus)
* [Dive into Deep Learning: Optimization Algorithms](https://d2l.ai/chapter_optimization/index.html)

---

## Probability & Information Theory

### Topics
* [ ] Random variables & probability distributions
* [ ] Joint, marginal, and conditional probability
* [ ] Bayes' Theorem & Maximum A Posteriori (MAP)
* [ ] Maximum Likelihood Estimation (MLE)
* [ ] Expectation, variance, and covariance
* [ ] Information Entropy ($H(X)$)
* [ ] Cross-Entropy Loss
* [ ] Kullback-Leibler (KL) Divergence
* [ ] Jensen-Shannon Divergence

### Resources
* [Seeing Theory (Brown University)](https://seeing-theory.brown.edu)
* [Deep Learning Book (Goodfellow et al.)](https://www.deeplearningbook.org)
* [Speech and Language Processing (Jurafsky & Martin, 3rd ed.)](https://web.stanford.edu/~jurafsky/slp3)

---

# Phase 1 — Classical NLP & Text Processing

## Text Normalization & Tokenization

### Topics
* [ ] Unicode normalization (NFC, NFD, NFKC, NFKD)
* [ ] Sentence segmentation & word tokenization
* [ ] Stop-word removal, lowercasing, and punctuation handling
* [ ] Stemming (Porter, Snowball) vs. Lemmatization (WordNet)
* [ ] Regular expressions for complex pattern extraction
* [ ] Subword tokenization: Byte-Pair Encoding (BPE)
* [ ] Subword tokenization: WordPiece & Unigram Language Model
* [ ] SentencePiece library internals

### Resources
* [NLTK Book: Natural Language Processing with Python](https://www.nltk.org/book)
* [spaCy 101 Guide](https://spacy.io/usage/spacy-101)
* [Hugging Face Tokenizers Documentation](https://huggingface.co/docs/tokenizers)

---

## Statistical & Linguistic Analysis

### Topics
* [ ] N-gram language models
* [ ] Maximum Likelihood Estimation for N-grams
* [ ] Smoothing techniques (Laplace, Good-Turing, Kneser-Ney)
* [ ] Part-of-Speech (POS) tagging (HMMs, Viterbi Algorithm)
* [ ] Named Entity Recognition (CRFs - Conditional Random Fields)
* [ ] Dependency parsing & transition-based parsers
* [ ] Constituency parsing & context-free grammars (CFGs)
* [ ] Edit distance & Levenshtein distance

### Resources
* [Jurafsky & Martin: Speech and Language Processing](https://web.stanford.edu/~jurafsky/slp3)
* [Stanford CS224N: Natural Language Processing with Deep Learning](https://web.stanford.edu/class/cs224n)
* [Stanford Stanza Library](https://stanfordnlp.github.io/stanza)

---

## Classical Vector Representations

### Topics
* [ ] One-Hot encoding
* [ ] Bag of Words (BoW) & Term Frequency
* [ ] Term Frequency - Inverse Document Frequency (TF-IDF)
* [ ] Co-occurrence matrices
* [ ] Pointwise Mutual Information (PMI / PPMI)
* [ ] Latent Semantic Analysis (LSA via SVD)
* [ ] Latent Dirichlet Allocation (LDA topic modeling)

### Resources
* [scikit-learn Text Feature Extraction](https://scikit-learn.org/stable/modules/feature_extraction.html#text-feature-extraction)
* [Gensim Topic Modeling](https://radimrehurek.com/gensim)

---

# Phase 2 — Distributed Word & Sentence Embeddings

## Static Word Embeddings

### Topics
* [ ] Distributional hypothesis
* [ ] Word2Vec: Continuous Bag of Words (CBOW)
* [ ] Word2Vec: Skip-Gram architecture
* [ ] Negative sampling & hierarchical softmax
* [ ] GloVe (Global Vectors) optimization objective
* [ ] FastText (Subword-level embeddings)
* [ ] Intrinsic evaluation (Word analogy, similarity tasks)
* [ ] Extrinsic evaluation downstream

### Resources
* [Word2Vec Google Code Archive](https://code.google.com/archive/p/word2vec)
* [Stanford GloVe Project](https://nlp.stanford.edu/projects/glove)
* [fastText Library](https://fasttext.cc)

---

## Sentence & Contextual Embeddings

### Topics
* [ ] Mean/Max pooling over word embeddings
* [ ] InferSent & Universal Sentence Encoder (USE)
* [ ] Sentence-BERT (SBERT) Siamese networks
* [ ] Triplet loss & Multiple Negatives Ranking Loss (MNRL)
* [ ] Cross-encoders vs. Bi-encoders
* [ ] MTEB (Massive Text Embedding Benchmark) evaluation

### Resources
* [Sentence-Transformers Documentation](https://www.sbert.net)
* [MTEB Benchmark Repository](https://github.com/embeddings-benchmark/mteb)
* [Hugging Face MTEB Leaderboard & Blog](https://huggingface.co/blog/mteb)

---

# Phase 3 — Neural Sequence Modeling

## Recurrent Architectures

### Topics
* [ ] Vanilla Recurrent Neural Networks (RNN)
* [ ] Backpropagation Through Time (BPTT)
* [ ] Vanishing and exploding gradients (Gradient clipping)
* [ ] Long Short-Term Memory (LSTM) gating mechanisms
* [ ] Gated Recurrent Units (GRU)
* [ ] Bidirectional RNNs / LSTMs
* [ ] Deep stacked recurrent networks

### Resources
* [Dive into Deep Learning: RNNs](https://d2l.ai/chapter_recurrent-neural-networks/index.html)
* [Colah's Blog: Understanding LSTMs](https://colah.github.io/posts/2015-08-Understanding-LSTMs)

---

## Sequence-to-Sequence & Early Attention

### Topics
* [ ] Encoder-Decoder architecture
* [ ] Information bottleneck problem
* [ ] Teacher forcing vs. free running
* [ ] Exposure bias
* [ ] Bahdanau additive attention
* [ ] Luong multiplicative attention
* [ ] Beam search decoding with length penalties

### Resources
* [Bahdanau et al. (2014): Neural Machine Translation by Jointly Learning to Align and Translate](https://arxiv.org/abs/1409.0473)
* [Luong et al. (2015): Effective Approaches to Attention-based Neural Machine Translation](https://arxiv.org/abs/1508.04025)
* [Stanford CS224N Lecture Notes](https://web.stanford.edu/class/cs224n)

---

# Phase 4 — Transformers & Pretraining

## Attention Mechanisms & Internals

### Topics
* [ ] Scaled Dot-Product Attention: $Q, K, V$
* [ ] Multi-Head Attention (MHA)
* [ ] Grouped-Query Attention (GQA) & Multi-Query Attention (MQA)
* [ ] Multi-Head Latent Attention (MLA)
* [ ] Positional encodings: Absolute sinusoidal
* [ ] Learned positional embeddings
* [ ] Relative positional encodings (T5, RoPE, ALiBi)
* [ ] Causal masking & padding masks
* [ ] Residual connections & Pre-LN vs. Post-LN vs. RMSNorm

### Resources
* [Jay Alammar: The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer)
* [Vaswani et al. (2017): Attention Is All You Need](https://arxiv.org/abs/1706.03762)
* [François Fleuret: The Little Book of Deep Learning](https://fleuret.org/francois/lbdl.html)

---

## Foundational Pretrained Architectures

### Topics
* [ ] **Encoder-only:** BERT, RoBERTa, DeBERTa (Masked LM, NSP, Disentangled Attention)
* [ ] **Decoder-only:** GPT-1, GPT-2, GPT-3, LLaMA, Mistral (Causal LM, Autoregressive generation)
* [ ] **Encoder-Decoder:** T5, BART (Span corruption, Denoising autoencoders)
* [ ] Mixture-of-Experts (MoE) routing & load-balancing loss
* [ ] Context window scaling: RoPE interpolation, YaRN, Sliding window attention

### Resources
* [Hugging Face NLP Course](https://huggingface.co/learn/nlp-course)
* [Karpathy: nanoGPT](https://github.com/karpathy/nanoGPT)
* [Stanford CS336: Language Modeling from Scratch](https://cs336.stanford.edu)

---

# Phase 5 — Model Adaptation & Post-Training

## Fine-Tuning & Parameter-Efficient Fine-Tuning (PEFT)

### Topics
* [ ] Full model fine-tuning (SFT - Supervised Fine-Tuning)
* [ ] Catastrophic forgetting
* [ ] Prefix Tuning & Prompt Tuning
* [ ] Low-Rank Adaptation (LoRA)
* [ ] QLoRA (NF4 quantization & double quantization)
* [ ] DoRA (Weight-Decomposed Low-Rank Adaptation)
* [ ] Adapter fusion & Task arithmetic

### Resources
* [Hugging Face PEFT Library](https://github.com/huggingface/peft)
* [Hu et al. (2021): LoRA](https://arxiv.org/abs/2106.09685)
* [Dettmers et al. (2023): QLoRA](https://arxiv.org/abs/2305.14314)

---

## Alignment & Preference Tuning

### Topics
* [ ] Instruction tuning dataset construction & deduplication
* [ ] Reinforcement Learning from Human Feedback (RLHF)
* [ ] Reward Model training & Bradley-Terry preference model
* [ ] Proximal Policy Optimization (PPO) for LLMs
* [ ] Direct Preference Optimization (DPO)
* [ ] Identity Preference Optimization (IPO) & Kahneman-Tversky Optimization (KTO)
* [ ] Constitutional AI & Reinforcement Learning from AI Feedback (RLAIF)

### Resources
* [Hugging Face TRL (Transformer Reinforcement Learning)](https://github.com/huggingface/trl)
* [Ouyang et al. (2022): InstructGPT](https://arxiv.org/abs/2203.02155)
* [Rafailov et al. (2023): Direct Preference Optimization](https://arxiv.org/abs/2305.18290)

---

# Phase 6 — Information Retrieval & RAG

## Lexical & Dense Retrieval

### Topics
* [ ] Inverted indexes & Boolean retrieval
* [ ] Okapi BM25 & BM25+ scoring functions
* [ ] Dense Passage Retrieval (DPR)
* [ ] ColBERT & ColBERTv2 (Contextualized late interaction)
* [ ] Approximate Nearest Neighbors (ANN): HNSW, IVF-PQ, ScaNN
* [ ] Vector databases: Qdrant, Milvus, Chroma, FAISS
* [ ] Hybrid search (Reciprocal Rank Fusion - RRF)
* [ ] Cross-encoder rerankers (Cohere Rerank, BGE Reranker)

### Resources
* [Stanford CS276: Information Retrieval and Web Search](https://web.stanford.edu/class/cs276)
* [FAISS: Facebook AI Similarity Search](https://github.com/facebookresearch/faiss)
* [BEIR: Benchmarking Information Retrieval](https://github.com/beir-cellar/beir)

---

## Retrieval-Augmented Generation (RAG) Architecture

### Topics
* [ ] Document ingestion pipelines (PDFs, Markdown, HTML parsing)
* [ ] Chunking strategies (Fixed-size, Recursive character, Semantic chunking)
* [ ] Metadata filtering & hybrid indexing
* [ ] Query rewriting, HyDE (Hypothetical Document Embeddings), and sub-queries
* [ ] Context compression & reranking
* [ ] Citation generation & hallucination detection
* [ ] GraphRAG: Knowledge graphs for global entity reasoning
* [ ] Corrective RAG (CRAG) & Self-RAG (Reflection tokens)

### Resources
* [LlamaIndex Documentation](https://docs.llamaindex.ai)
* [LangChain Documentation](https://python.langchain.com)
* [Lewis et al. (2020): Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)

---

# Phase 7 — Evaluation & Benchmarking

## Task-Specific & Generation Metrics

### Topics
* [ ] Classification: Precision, Recall, Macro/Micro F1, PR-AUC
* [ ] Generation overlap: BLEU, ROUGE (1, 2, L), METEOR, chrF
* [ ] Model-based metrics: BERTScore, MoverScore, COMET
* [ ] Language modeling: Cross-Entropy, Perplexity (PPL), Bits-per-character (BPC)
* [ ] Information retrieval: MRR@k, NDCG@k, Precision@k, Recall@k, MAP

### Resources
* [Hugging Face Evaluate](https://huggingface.co/docs/evaluate)
* [BEIR Evaluation Benchmark](https://github.com/beir-cellar/beir)

---

## LLM System Evaluation

### Topics
* [ ] Standard benchmarks: MMLU, GSM8K, HumanEval, ARC, HellaSwag
* [ ] LLM-as-a-Judge (Pairwise comparison, single-answer grading, rubric scoring)
* [ ] LLM evaluation biases: Position bias, verbosity bias, self-enhancement bias
* [ ] RAG evaluation triads: Ragas, TruLens (Faithfulness, Answer Relevance, Context Precision)
* [ ] Dataset contamination detection & deduplication
* [ ] Calibration & confidence estimation

### Resources
* [EleutherAI LM Evaluation Harness](https://github.com/EleutherAI/lm-evaluation-harness)
* [Ragas: Automated RAG Evaluation](https://github.com/explodinggradients/ragas)
* [LMSYS Chatbot Arena](https://lmsys.org/blog/2023-05-03-arena)

---

# Phase 8 — High-Performance Inference & Serving

## Memory & Computational Profiling

### Topics
* [ ] Arithmetic intensity & Roofline model
* [ ] Memory-bound vs. compute-bound operations
* [ ] KV-cache sizing & memory footprint calculation:
  $$\text{Memory} = 2 \times 2 \times n_{\text{layers}} \times n_{\text{heads}} \times d_{\text{head}} \times \text{seq\_len} \times \text{batch\_size}$$
* [ ] Time to First Token (TTFT) vs. Inter-Token Latency (ITL)
* [ ] Prefill phase (GEMM compute-bound) vs. Decode phase (GEMV memory-bound)
* [ ] FLOPs accounting during training and inference

### Resources
* [Stanford CS336 Course Notes](https://cs336.stanford.edu)
* [Transformer Inference Survey (Kipply)](https://kipp.ly/transformer-inference-survey)

---

## Inference Optimization & Engines

### Topics
* [ ] FlashAttention (FlashAttention-1, 2, 3: IO-awareness, SRAM tiling, online softmax)
* [ ] PagedAttention & memory fragmentation mitigation
* [ ] Continuous batching / Dynamic batching
* [ ] Speculative decoding & Medusa heads
* [ ] Quantization techniques: RTN, GPTQ, AWQ, SmoothQuant, GGUF (k-quants)
* [ ] Production runtimes: vLLM, TensorRT-LLM, TGI, llama.cpp
* [ ] OpenAI Triton for custom GPU kernel programming

### Resources
* [vLLM Project](https://github.com/vllm-project/vllm)
* [llama.cpp Repository](https://github.com/ggml-org/llama.cpp)
* [Triton Language Documentation](https://triton-lang.org)

---

# Phase 9 — Distributed Training & Scaling

## Parallelism Strategies

### Topics
* [ ] Data Parallelism (DDP) & Distributed Data Parallel gradient synchronization
* [ ] Fully Sharded Data Parallel (FSDP) & DeepSpeed ZeRO (Stages 1, 2, 3)
* [ ] Tensor Parallelism (Megatron-LM column/row parallel linear layers)
* [ ] Pipeline Parallelism (GPipe, 1F1B schedule, pipeline bubbles)
* [ ] Sequence Parallelism & Context Parallelism (RingAttention)
* [ ] Expert Parallelism for MoE models

### Resources
* [Megatron-LM (NVIDIA)](https://github.com/NVIDIA/Megatron-LM)
* [DeepSpeed (Microsoft)](https://github.com/deepspeedai/DeepSpeed)
* [PyTorch FSDP Tutorial](https://pytorch.org/tutorials/intermediate/FSDP_tutorial.html)

---

## Scaling Laws & Data Engineering

### Topics
* [ ] Kaplan et al. scaling laws ($N, D, C$)
* [ ] Chinchilla compute-optimal scaling laws ($D \approx 20N$)
* [ ] Web data scraping & extraction (Common Crawl, Resiliparse, Trafilatura)
* [ ] Quality filtering: fastText classifiers, heuristic filters, perplexity filtering
* [ ] Deduplication: Exact hashing, MinHash LSH, Suffix Arrays
* [ ] Synthetic data generation & filtering (Evol-Instruct, UltraFeedback, Cosmopedia)

### Resources
* [Kaplan et al. (2020): Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)
* [Hoffmann et al. (2022): Chinchilla Paper](https://arxiv.org/abs/2203.15556)
* [Datatrove (Hugging Face)](https://github.com/huggingface/datatrove)

---

# Phase 10 — MLOps & Production Engineering

## LLMOps Infrastructure

### Topics
* [ ] Docker containerization for CUDA/PyTorch environments
* [ ] Kubernetes deployment & GPU scheduling (KEDA autoscaling)
* [ ] Semantic caching (GPTCache, Redis vector caches)
* [ ] Rate limiting, load balancing & prompt routing (LiteLLM, Portkey)
* [ ] Observability: Langfuse, Arize Phoenix, OpenInference, Prometheus/Grafana
* [ ] CI/CD for prompt testing, regression gates, and model checkpoints

### Resources
* [Langfuse Observability](https://github.com/langfuse/langfuse)
* [LiteLLM Proxy](https://github.com/BerriAI/litellm)
* [Kubernetes Tutorials](https://kubernetes.io/docs/tutorials)

---

## Safety, Security & Guardrails

### Topics
* [ ] Prompt injection (Direct, indirect, jailbreaks)
* [ ] Guardrail frameworks: Llama Guard, NeMo Guardrails, Guardrails AI
* [ ] PII detection, redaction, and data anonymization
* [ ] Toxicity, bias, and harmful content filtering
* [ ] Watermarking AI-generated text & provenance verification

### Resources
* [NeMo Guardrails (NVIDIA)](https://github.com/NVIDIA/NeMo-Guardrails)
* [Llama Guard (Meta)](https://github.com/meta-llama/PurpleLlama)

---

# Phase 11 — Mandatory Research Papers

* [ ] **Word2Vec:** *Distributed Representations of Words and Phrases and their Compositionality* (Mikolov et al., 2013)
* [ ] **Seq2Seq + Attention:** *Neural Machine Translation by Jointly Learning to Align and Translate* (Bahdanau et al., 2014)
* [ ] **Transformer:** *Attention Is All You Need* (Vaswani et al., 2017)
* [ ] **BERT:** *Pre-training of Deep Bidirectional Transformers for Language Understanding* (Devlin et al., 2018)
* [ ] **GPT-3:** *Language Models are Few-Shot Learners* (Brown et al., 2020)
* [ ] **Scaling Laws:** *Scaling Laws for Neural Language Models* (Kaplan et al., 2020)
* [ ] **Chinchilla:** *Training Compute-Optimal Large Language Models* (Hoffmann et al., 2022)
* [ ] **Dense Retrieval:** *Dense Passage Retrieval for Open-Domain Question Answering* (Karpukhin et al., 2020)
* [ ] **ColBERT:** *Efficient and Effective Passage Search via Contextualized Late Interaction over BERT* (Khattab & Zaharia, 2020)
* [ ] **RAG:** *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks* (Lewis et al., 2020)
* [ ] **FlashAttention:** *Fast and Memory-Efficient Exact Attention with IO-Awareness* (Dao et al., 2022)
* [ ] **LoRA:** *Low-Rank Adaptation of Large Language Models* (Hu et al., 2021)
* [ ] **InstructGPT:** *Training language models to follow instructions with human feedback* (Ouyang et al., 2022)
* [ ] **DPO:** *Direct Preference Optimization: Your Language Model is Secretly a Reward Model* (Rafailov et al., 2023)
* [ ] **vLLM:** *Efficient Memory Management for Large Language Model Serving with PagedAttention* (Kwon et al., 2023)
* [ ] **RoPE:** *RoFormer: Enhanced Transformer with Rotary Position Embedding* (Su et al., 2021)

---

# Portfolio Projects

## Beginner
* [ ] Build a pure NumPy vectorized linear layer with analytical backprop and numerical gradient check
* [ ] Implement an autograd engine (`micrograd`-style) with scalar reverse-mode automatic differentiation
* [ ] Train Word2Vec (Skip-Gram with Negative Sampling) from a blank Python file on text8
* [ ] Build an Inverted Index BM25 search engine with sub-linear query time

## Intermediate
* [ ] Build a Byte-Pair Encoding (BPE) tokenizer from scratch (`minBPE`-style)
* [ ] Implement a full Decoder-only Transformer in PyTorch from scratch with causal masking
* [ ] Build a miniature pretraining pipeline on TinyStories; evaluate cross-entropy loss and generation quality
* [ ] Implement custom LoRA layers from scratch; fine-tune a small base model (e.g., LLaMA-1B) on instruction data
* [ ] Implement Direct Preference Optimization (DPO) loss from scratch and run preference alignment
* [ ] Build a production-grade Hybrid RAG pipeline (BM25 + FAISS + BGE Reranker) with citation verification

## Advanced (Targeting Frontier Labs)
* [ ] Implement FlashAttention forward pass in **OpenAI Triton**; benchmark against naive PyTorch attention across sequence lengths up to 16k tokens
* [ ] Build a high-throughput inference engine prototype implementing **PagedAttention** and continuous batching in Python/C++
* [ ] Build an end-to-end web data ingestion pipeline: Crawl $\rightarrow$ Extract $\rightarrow$ MinHash LSH deduplication $\rightarrow$ FastText quality filtering $\rightarrow$ Tokenization $\rightarrow$ Sharded binary storage
* [ ] Implement a comprehensive BEIR retrieval evaluation benchmark comparing BM25, DPR, and ColBERTv2 on out-of-domain datasets
* [ ] Build an automated LLM evaluation harness featuring LLM-as-a-judge with position-bias mitigation and calibrated pairwise ranking

---

# Interview Readiness Checklist

* [ ] Can derive backpropagation for matrix multiplication $\frac{\partial L}{\partial \mathbf{W}} = \mathbf{X}^T \left(\frac{\partial L}{\partial \mathbf{Y}}\right)$ and Softmax+Cross-Entropy $\nabla_{\mathbf{z}} L = \mathbf{p} - \mathbf{y}$ on a whiteboard
* [ ] Can write Multi-Head Attention and RoPE from a blank buffer in pure PyTorch
* [ ] Can explain the exact difference between Pre-LN, Post-LN, and RMSNorm, and their impact on gradient flow
* [ ] Can explain the memory overhead of Adam optimizer states (16 bytes/parameter in FP32 vs. 8 bytes in FP16/BF16 mixed precision)
* [ ] Can calculate KV-cache memory requirements for a given architecture, sequence length, and concurrency level
* [ ] Can explain why naive attention is memory-bandwidth bound and how FlashAttention achieves $O(N)$ SRAM IO-complexity
* [ ] Can explain PagedAttention internals and how virtual memory pages eliminate external fragmentation
* [ ] Can mathematically contrast RLHF (PPO) with Direct Preference Optimization (DPO)
* [ ] Can derive the Chinchilla compute-optimal token-to-parameter ratio from budget constraints
* [ ] Can explain late-interaction retrieval (ColBERT) vs. single-vector dense retrieval (bi-encoder) in terms of latency, storage, and MRR
