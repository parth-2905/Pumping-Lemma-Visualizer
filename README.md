# 🚀 Pumping Lemma Visualizer  
### Master the Pumping Lemma through Interactive Simulation


---

## 📌 Overview  

The **Pumping Lemma Visualizer** is an interactive educational tool designed to make one of the most abstract topics in **Theory of Computation** tangible and intuitive.

Instead of passively reading proofs, users can:
- Construct strings  
- Decompose them into `x, y, z`  
- Apply pumping (`y^i`)  
- Visually observe whether the language holds  

👉 The goal is simple: **convert theoretical reasoning into an experimental process**.


![Landing Page](public/screenshots/hero.png)
---

## 🎯 Problem Statement  

The Pumping Lemma is widely used to prove that a language is **not regular**, yet it remains one of the most misunderstood concepts due to:

- Lack of visualization for string decomposition  
- Difficulty in choosing correct `x, y, z`  
- No intuitive way to test different values of `i`  
- Over-reliance on memorized proof structures  

This project addresses these issues by providing a **simulation-driven interface** where users can experiment, fail, and learn.


---
# THE PROJECT
---



## 🧠 Understanding the Pumping Lemma  

The Pumping Lemma states:

> For every regular language, there exists a pumping length `p` such that any string `s` with `|s| ≥ p` can be written as `s = xyz` satisfying:
>
> - `|xy| ≤ p`  
> - `|y| > 0`  
> - `xy^i z ∈ L` for all `i ≥ 0`

![Concept](public/screenshots/concepts.png)

### Why Students Struggle
- The lemma is **existential + universal** → tricky logic  
- Requires **counterexample thinking**  
- No direct algorithm → only reasoning  

### What This Visualizer Does
- Makes decomposition explicit  
- Shows constraints dynamically  
- Allows testing multiple `i` values instantly  
- Bridges the gap between **theory and intuition**

---

## 📚 Everything You Need to Master the Lemma  

This tool is built as a **complete learning environment**, not just a simulator.

It enables:
- 📌 Concept clarity → understand *why* lemma works  
- 🔍 Exploration → test multiple decompositions  
- ❌ Counterexample discovery → break regularity assumptions  
- 🔁 Iterative learning → refine intuition through trials  

👉 By repeatedly experimenting, users develop the exact mindset needed for **proof-based questions in exams and interviews**.

---

## 💡 Use Cases  

### 🎓 Academic Learning  
- Ideal for **automata theory courses**  
- Helps in assignments and exam preparation  

### 🧪 Proof Construction  
- Test whether a language satisfies pumping conditions  
- Quickly identify contradictions  

### 👨‍💻 Interview Preparation  
- Strengthens understanding of **formal language theory**  
- Useful for CS fundamentals rounds  

### 📊 Teaching Tool  
- Professors can demonstrate concepts live  
- Makes lectures interactive and engaging  

---

## 🌐 Live Demo  

🔗 **[Try the Live Demo](https://explorers.net.in/)** *(update if needed)*  

---

## ✨ Live Demo Features (Detailed)

### 🔤 Custom Language & String Input  
- Define languages like `a^n b^n`, `0^n1^n`, etc.  
- Input custom strings satisfying `|s| ≥ p`  

---

### 📏 Pumping Length Control  
- Dynamically set `p`  
- Instantly see how constraints affect decomposition  

---

### ✂️ Dynamic String Decomposition  
- Visual split into:
  - `x` (prefix)  
  - `y` (pumpable segment)  
  - `z` (suffix)  
- Enforces:
  - `|xy| ≤ p`  
  - `|y| > 0`  

---

### 🔁 Real-Time Pumping Engine  
- Simulate `xy^i z`  
- Adjust `i` interactively  
- Observe how strings evolve  

---

### 🎨 Visual Feedback System  
- Color-coded representation:
  - `x`, `y`, `z` clearly distinguished  
- Immediate indication of:
  - Valid vs invalid strings  
  - Membership in language  

---

## 🚀 Advanced Interactive Modes  

### 🧭 Guided Mode  
- Step-by-step walkthrough of pumping lemma  
- Helps beginners understand each constraint  
- Explains *why each step matters*  

---

### 🔄 Sequencer Mode  
- Automatically iterates through different values of `i`  
- Shows pattern of string transformations  
- Useful for spotting violations quickly  

---

### ⚔️ Adversarial Mode  
- Simulates worst-case decomposition choices  
- Mimics how proofs are structured in exams  
- Forces user to think critically about all possibilities  

---

### 🔀 Multi-Case Mode  
- Explore multiple decompositions simultaneously  
- Compare outcomes across different `x, y, z` splits  
- Understand **universality condition** of the lemma  

---

## 🏗️ Feature Summary  

### Core Engine
- Pumping lemma simulation  
- Custom input handling  
- Constraint validation  

### Visualization
- Color-coded segments  
- Real-time updates  
- Interactive transformations  

### Learning Enhancements
- Guided explanations  
- Multi-scenario testing  
- Adversarial reasoning  

---

## 🛠️ Tech Stack  

- **Frontend:** React + JavaScript  
- **Build Tool:** Vite  
- **Visualization:** Custom UI + animations  
- **Deployment:** GitHub Pages / Web  

---

## 📂 Project Structure  

