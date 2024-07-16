---
title: "SSH Credentials Collector"
draft: false
description: "Collects SSH keys from Linux users"
tags: ["credentials collector", "ssh", "linux"]
pre: "<i class='fa fa-terminal'></i> "
---

## Description

SSH keys are crucial for secure access to remote servers and systems. Attackers
may attempt to steal them for gaining access to sensitive systems, data theft,
lateral movement, privilege escalation, and persistence.

The SSH Credentials Collector steals SSH keys from Linux users. For all users
on the system, it locates the `/home/<user>/.ssh` directory and steals keypairs
from it. The supported private key encryption formats are RSA, DSA, EC, and
ECDSA.
