---
title: "How to simulate a ransomware attack"
draft: false
pre: '<i class="fa fa-lock"></i> '
tags: ["howtos", "simulate ransomware"]
---

Follow these steps to successfully simulate a ransomware attack on your
network.

1. Prepare your environment for a ransomware simulation

    Infection Monkey will only encrypt files that are allowed by you.
    Prepare your network by adding a "ransomware target" directory to each
    machine in your environment, and add some files to this directory that are
    safe to encrypt. This can be done using a configuration management tool,
    such as
    [Ansible](https://docs.ansible.com/ansible/latest/user_guide/) or
    [PsExec](https://theitbros.com/using-psexec-to-run-commands-remotely/), or
    a Windows GPO.

    For the ransomware simulation to succeed on a machine, the user running the
    Infection Monkey Agent must have read and write permissions for the target
    directory and its constituent files. Note that the simulation is not
    recursive, i.e. it will not traverse any sub-directories of the configured
    target directory.

1. Configure the simulation

    In the configuration, specify which directory Infection Monkey should
    target for encryption and provide a file extension that Infection Monkey
    should use to rename the encrypted files.

    If desired, enable the options to leave a README.txt on each machine and
    change the desktop wallpaper of each machine.

    ![Ransomware configuration](
    /images/island/configuration-page/ransomware-configuration.png
    "Ransomware configuration")

1. Configure propagation

    If you would like Infection Monkey to propagate through the network,
    [Configure](/usage/configuration/) the network settings and enable one or
    more exploiters.

1. Run the Agent

    Once everything is configured to your liking,
    [run the agent](/usage/getting-started#running-the-infection-monkey).

1. Clean up

    After the simulation is complete, use the same mechanism you used in step 1
    to either remove the target directory or replace the encrypted files with
    the originals.


### See also
- [Ransomware simulation](/features/ransomware-simulation)
- [Ransomware tutorial](/tutorials/ransomware/)
- [Ransomware reference documentation](/reference/payloads/ransomware)
