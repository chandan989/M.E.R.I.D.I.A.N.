# Web5 Infra Pods for MERIDIAN

This repository contains the necessary infrastructure pods for running a Web5 environment.

## What is Web5?

Web5 is a decentralized web platform that enables developers to build decentralized applications (DWAs) that return ownership and control over identity and data to individuals. It is built on top of Bitcoin, Decentralized Identifiers (DIDs), and Decentralized Web Nodes (DWNs).

Web5 provides a new layer of identity and data storage for the web. It allows users to own their identity and data, and to control who has access to it. This is in contrast to the current web, where identity and data are controlled by large corporations.

```mermaid
graph TD
    subgraph "Web5: The Decentralized Web Platform"
        A[Decentralized Identifiers <br> (DIDs)]
        B[Decentralized Web Nodes <br> (DWNs)]
        C[Self-Sovereign Identity]
        D[Decentralized Data Storage]
    end

    subgraph "Traditional Web (Web2)"
        E[Centralized Identity Providers <br> (e.g., Google, Facebook)]
        F[Centralized Data Silos]
    end

    C --> A
    D --> B

    A -- "Enables" --> C
    B -- "Enables" --> D

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#ccf,stroke:#333,stroke-width:2px
```

## Importance and Relevance

These infrastructure pods are crucial for the MERIDIAN project as they provide the foundational services for Web5 functionality. They include:

*   **DID-DHT:** A Distributed Hash Table for resolving Decentralized Identifiers (DIDs).
*   **DWN Server:** A Decentralized Web Node server for storing and managing data.

By running these pods, we enable a decentralized and user-centric architecture for MERIDIAN.

## Core Components in Detail

### Decentralized Identifiers (DIDs)

DIDs are a new type of identifier that enables verifiable, decentralized digital identity. A DID refers to any subject (e.g., a person, organization, thing, data model, abstract entity, etc.) as determined by the controller of the DID. DIDs are URIs that associate a DID subject with a DID document, allowing for trustable interactions with that subject.

### DID-DHT (Distributed Hash Table)

The DID-DHT pod is an implementation of a Distributed Hash Table used to store and resolve DID documents. When a user wants to interact with a DID, they can query the DHT to retrieve the corresponding DID document. This document contains the public keys and service endpoints necessary to interact with the DID subject.

Our DID-DHT is accessible via:
*   **TCP:** `136.115.91.108:8305`
*   **UDP:** `136.115.91.108:6881`

### Decentralized Web Nodes (DWNs)

DWNs are personal datastores that hold public or encrypted data. A user can have multiple DWNs, and they can control where their data is stored. DWNs are used to store data for decentralized applications, and they can be used to sync data across multiple devices.

Our DWN Server is accessible at: `https://dwn-server-1023618994627.asia-northeast1.run.app/`

## MERIDIAN Architecture

Here is a simplified diagram of how the components work together in the MERIDIAN project:

```mermaid
graph TD
    subgraph "MERIDIAN Application Flow"
        App[MERIDIAN App <br> (User's Device)]
        DID_DHT[DID-DHT <br> (Our Infra)]
        DID_Doc[DID Document <br> (on DHT)]
        DWN[DWN Server <br> (Our Infra)]
    end

    App -- "1. Looks up DID" --> DID_DHT
    DID_DHT -- "2. Resolves to" --> DID_Doc
    App -- "3. Reads DWN endpoint from DID Doc" --> DID_Doc
    App -- "4. Interacts with" --> DWN

    style App fill:#bbf,stroke:#333,stroke-width:2px
    style DID_DHT fill:#f9f,stroke:#333,stroke-width:2px
    style DWN fill:#ccf,stroke:#333,stroke-width:2px
```

**Explanation of the flow:**

1.  The **MERIDIAN App** on a user's device needs to interact with another user or service.
2.  It uses the user's DID to look up the corresponding **DID Document** in the **DID-DHT**.
3.  The DID Document contains the endpoint for the user's **DWN Server**.
4.  The MERIDIAN App can then interact with the user's DWN Server to read or write data.

This architecture ensures that users have control over their identity and data, which is a core principle of Web5.

## Deployment Status

These pods are deployed and **Up & Running** for MERIDIAN.

## Ports Information

*   **DID-DHT:**
    *   TCP: `136.115.91.108:8305`
    *   UDP: `136.115.91.108:6881`
*   **DWN SERVER:** `https://dwn-server-1023618994627.asia-northeast1.run.app/`
