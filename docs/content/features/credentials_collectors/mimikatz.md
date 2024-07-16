---
title: "Mimikatz Credentials Collector"
draft: false
description: "Collects credentials from Windows Credential Manager"
tags: ["credentials collector", "mimikatz", "windows"]
pre: "<i class='fa fa-cat'></i> "
---

## Description

Mimikatz is an open-source tool widely used by attackers to extract plaintext
passwords, hashes, PINs, and Kerberos tickets from memory, which assist in
privilege escalation and lateral movement.

The Mimikatz Credentials Collector uses [pypykatz](https://github.com/skelsec/pypykatz)
(a pure-Python implementation of [mimikatz](https://github.com/gentilkiwi/mimikatz))
to steal credentials from Windows Credential Manager.

![Mimikatz Configuration](/images/island/configuration-page/mimikatz-credentials-collector-configuration.png "Mimikatz configuration")
