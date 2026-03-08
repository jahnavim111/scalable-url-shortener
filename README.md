# Scalable URL Shortener

An enterprise-grade URL shortening service built with **Node.js**, focusing on high-availability and distributed system principles.

## 🚀 Key Features
* **Distributed ID Generation:** Implemented the **Snowflake Algorithm** to ensure collision-free, unique IDs across multiple server nodes without a central bottleneck.
* **High-Performance Caching:** Integrated **Redis** to serve viral links with sub-millisecond latency, protecting the primary database from traffic spikes.
* **Base62 Encoding:** Optimized URL length using Base62, allowing for billions of unique combinations with just 6-7 characters.
* **Click Analytics:** Leveraged **HTTP 302 redirects** to capture real-time click data, timestamps, and referrer information for data analysis.

## 🛠 Tech Stack
* **Runtime:** Node.js / Express
* **Database:** MySQL (Persistence)
* **Cache:** Redis (Speed)
* **Architecture:** Distributed Systems / Microservices-ready
