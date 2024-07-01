---
title: "How to simulate a ransomware attack"
draft: false
pre: '<i class="fa fa-lock"></i> '
tags: ["howtos", "simulate ransomware"]
---

Follow these steps to successfully simulate a ransomware attack on your
network.

1. Prepare your environment for a ransomware simulation

    The Infection Monkey will only encrypt files that are allowed by you.
    Prepare your network by adding a "ransomware target" directory to each
    machine in your environment. This can be done using a configuration
    management tool, such as
    [Ansible](https://docs.ansible.com/ansible/latest/user_guide/) or
    [PsExec](https://theitbros.com/using-psexec-to-run-commands-remotely/), or
    a Windows GPO.

1. Configure the simulation

    In the configuration, specify which directory the Infection Monkey should
    target for encryption and provide a file extension that the Infection Monkey
    should use to rename the encrypted files.

    If desired, enable the options to leave a README.txt on each machine and
    change the desktop wallpaper of each machine.

    ![Ransomware configuration](
    /images/island/configuration-page/ransomware-configuration.png
    "Ransomware configuration")

1. Configure propagation

    If you would like the Infection Monkey to propagate through the network,
    [Configure](/usage/configuration/) the network settings and enable one or
    more exploiters.

1. Run the Agent

    Once everything is configured to your liking, simply [run the agent](
    /usage/getting-started#running-the-infection-monkey) to begin the
    ransomware simulation.

1. Clean up

    After the simulation is complete, you can use the same mechanism you used in
    step 1 to either remove the target directory, replace the encrypted files,
    or decrypt them (see ["How are the files encrypted?"](
    /features/ransomware-simulation/#how-are-the-files-encrypted)).


### See also
- [Ransomware simulation](/features/ransomware-simulation)
- [Ransomware tutorial](/tutorials/ransomware/)
- [Ransomware reference documentation](/reference/payloads/ransomware)
