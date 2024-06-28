---
title: "How to simulate a ransomware attack"
draft: false
pre: '<i class="fa fa-lock"></i> '
tags: ["howtos", "simulate ransomware"]
---

Follow these steps to successufully simulate a ransomware attack on your
network.

### 1. Prepare your environment for a ransomware simulation

The Infection Monkey will only encrypt files that you allow it to. In order to
take full advantage of the Infection Monkey's ransomware simulation, you'll
need to provide the Infection Monkey with a directory that contains files that
are safe for it to encrypt. The recommended approach is to use a configuration
management tool, such as
[Ansible](https://docs.ansible.com/ansible/latest/user_guide/) or
[PsExec](https://theitbros.com/using-psexec-to-run-commands-remotely/), or even
a Windows GPO, to add a "ransomware target" directory to each machine in your
environment. The Infection Monkey can then be configured to encrypt files in
this directory.

### 2. Configure encryption

To ensure minimum interference and easy recoverability, the ransomware
simulation will only encrypt files contained in a user-specified directory. If
no directory is specified, no files will be encrypted.

Infection Monkey appends the `.m0nk3y` file extension to files that it
encrypts. You may optionally provide a custom file extension for Infection
Monkey to use instead. You can even provide no file extension, but take
caution: you'll no longer be able to tell if the file has been encrypted based
on the filename alone!

![Ransomware
configuration](/images/island/configuration-page/ransomware-configuration.png
"Ransomware configuration")

### 3. Configure propagation

If you would like the Infection Monkey to propagate through the network,
[Configure](/usage/configuration/) the network settings and enable one or more
exploiters.

### 4. Run the Agent

Once everything is configured to your liking, simply [run the
agent](/usage/getting-started#running-the-infection-monkey) to begin the
ransomware simulation.

### 5. Clean up

After the simulation is complete, you can use the same mechanism you used in
[step
1](/howtos/simulate-ransomware#1-prepare-your-environment-for-a-ransomware-simulation)
to either remove the target directory or replace the encrypted files with
unencrypted files. In most cases, there's no need to attempt to decrypt the
files, as you should still have the originals.


### See also
- [Ransomware simulation](/features/ransomware-simulation)
- [Ransomware tutorial](/tutorials/ransomware/)
- [Ransomware reference documentation](/reference/payloads/ransomware)
