---
title: "Missing Pieces in Java Persistence Puzzle"
meetupNumber: 6
startTime: "12:00"
summary: "Recap of Gujarat JUG's January 2025 online session where Sathish Kumar Thiyagarajan explored the gaps in Java persistence and how database-first design and type safety close them."
date: "2025-01-19"
format: "online"
city: "Online"
venueName: "Zoom"
lumaUrl: "https://luma.com/ro4cgjqu"
registered: 74
cover: "https://images.lumacdn.com/event-covers/kg/649a9f9a-ca5f-4dcb-9e2a-ac8b154c7779"
talks:
  - title: "Missing Pieces in Java Persistence Puzzle"
    speakers:
      - "sathish-kumar"
    abstract: "Gaps in traditional Java persistence solutions and strategies to close them: database-first design, type safety and productivity for scalable applications."
hosts:
  - "vikas-rajput"
tags:
  - "persistence"
  - "databases"
---

Gujarat JUG opened 2025 with an online deep dive into one of the most debated topics in the Java world: **persistence**. On **Sunday, 19 January 2025**, developers from across Gujarat and beyond joined the session on Zoom, with **74 people registering** on Luma for the talk.

## Why talk about Java persistence again?

Almost every Java application talks to a database, and most of us reach for an ORM such as Hibernate/JPA by default. That works, until it doesn't: N+1 queries, leaky abstractions, runtime errors that the compiler could have caught, and schemas that drift away from the code. The session set out to name these *missing pieces* and show practical ways to fill them.

## What the session covered

Speaker [**Sathish Kumar Thiyagarajan**](/people/sathish-kumar), Software Architect and CTO at OurKadai Technologies, walked through:

- **The gaps in traditional persistence tooling.** Where ORMs hide too much, and where hand-written SQL becomes hard to maintain.
- **Database-first design.** Treating the schema as the source of truth and generating type-safe code from it, rather than the other way round.
- **Type safety end to end.** Catching query mistakes at compile time instead of in production.
- **Productivity at scale.** How these ideas keep large codebases fast to change as the data model grows.

## Who should watch

If you build Spring Boot or Jakarta EE services backed by a relational database, the ideas from this talk apply directly to your day-to-day work.

<!-- TO ADD (organisers): how the day went, actual turnout, giveaways/goodies and who provided them, food partner, photos (add to `gallery`) and session recordings (add to `videos`). Then set recapReady: true. -->
