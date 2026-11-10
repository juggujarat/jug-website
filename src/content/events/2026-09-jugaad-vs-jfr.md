---
meetupNumber: 21
title: "September Meetup: Jugaad vs JFR & Distributed Job Scheduling with JobRunr"
startTime: "10:30"
summary: "Recap of Gujarat JUG's September 2026 meetup at IGNEK, Ahmedabad: profiling the real cost of Java libraries with JFR, and distributed job scheduling with JobRunr."
date: "2026-09-26"
venueName: "IGNEK"
address: "E 910-912, Ganesh Glory 11, Jagatpur Road, Jagatpur, Ahmedabad 382470"
lumaUrl: "https://luma.com/2dja95on"
registered: 53
talks:
  - title: "Jugaad vs JFR: What Your Java Libraries Are Really Costing You"
    speakers:
      - "ashish-vaghela"
  - title: "JobRunr: Easy Distributed Job Scheduling"
    speakers:
      - "ronald-dehuysser"
hosts:
  - "dhaval-gajjar"
  - "vikas-rajput"
  - "daman-singh-rajput"
partners:
  - partner: "ignek"
    role: "venue"
tags:
  - "performance"
  - "profiling"
  - "jfr"
  - "scheduling"
---

On **Saturday, 26 September 2026**, Gujarat JUG met at [**IGNEK**](/partners/ignek), a Liferay boutique company in Jagatpur, Ahmedabad, for two practical sessions on Java performance and job scheduling. **53 people registered** on Luma, from students and junior developers to QA engineers and experienced Java developers.

## Session 1: Jugaad vs JFR

Every dependency we add is a quick fix ("jugaad") with a cost we rarely measure. In **"Jugaad vs JFR: What Your Java Libraries Are Really Costing You"**, [**Ashish Vaghela**](/people/ashish-vaghela), Software Crafter at Nelkinda Software Craft, used live, dependency-free Java benchmarks measured with **Java Flight Recorder (JFR)** to show what popular libraries really cost at runtime:

- **Jackson:** reflection and serialization overhead
- **Hibernate:** the N+1 query problem
- **Lombok:** hidden tooling and maintenance trade-offs
- **JFR and async-profiler:** seeing what actually happens under the hood

Attendees left with runnable demo code, profiling commands and a five-question checklist for evaluating a dependency before it causes problems in production.

## Session 2: JobRunr, easy distributed job scheduling

[**Ronald Dehuysser**](https://www.jobrunr.io/), founder of **JobRunr**, introduced JobRunr, an open-source library for running background jobs in Java. He covered recurring tasks, data processing, reports and automated workflows, and how JobRunr makes scheduled, distributed job execution simple in Java applications.

## Thank you

Thanks to our hosts [**Dhaval Gajjar**](https://www.linkedin.com/in/dhavalgajjarin/), [**Vikas Rajput**](https://www.linkedin.com/in/vikasrajputin/) and [**Daman Singh Rajput**](/people/daman-singh-rajput), and to **IGNEK** for hosting the community.

<!-- TO ADD (organisers): actual turnout, giveaways. -->
