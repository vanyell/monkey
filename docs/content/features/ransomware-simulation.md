---
title: "Ransomware Simulation"
draft: false
pre: "<i class='fa fa-lock'></i> "
tags: ["usage", "ransomware"]
---

## Description
The Infection Monkey is capable of simulating a ransomware attack on your
network using a set of configurable behaviors. In order to simulate the
behavior of ransomware as accurately as possible, the Infection Monkey can
[encrypt user-specified
files](/reference/payloads/ransomware/#files-targeted-for-encryption) using a
[fully reversible algorithm](#how-are-the-files-encrypted). A number of
mechanisms are in place to ensure that all actions performed by the encryption
routine are safe for production environments.


## How files are encrypted

Files are "encrypted" in place with a simple bit flip. Encrypted files are
renamed to have a file extension (`.m0nk3y` by default) appended to their
names. You can even provide no file extension, but take caution: you'll no
longer be able to tell if the file has been encrypted based on the filename
alone.

The Infection Monkey's encryption method is safe since it is easy to "decrypt"
your files. You can simply perform a bit flip on the files again and rename
them to remove the appended `.m0nk3y` extension.

Flipping a file's bits is sufficient to simulate the encryption behavior of
ransomware, as the data in your files has been manipulated (leaving them
temporarily unusable). Files are then renamed with a new extension appended,
which is similar to the way that many ransomwares behave. As this is a
simulation, your security solutions should be triggered to notify you or
prevent these changes from taking place.

## Files targeted for encryption

During the ransomware simulation, attempts will be made to encrypt all regular
files with [targeted file
extensions](/reference/payloads/ransomware/#files-targeted-for-encryption) in
the configured directory. The simulation is not recursive, i.e. it will not
touch any files in sub-directories of the configured directory. The Infection
Monkey will not follow any symlinks or shortcuts. If no directory is specified,
no files will be encrypted.

These precautions are taken to prevent the Infection Monkey from accidentally
encrypting files that you didn't intend to encrypt.

In order to take full advantage of the Infection Monkey's ransomware
simulation, add a "ransomware target" directory (containing files that are safe
for encryption) to each machine in your environment. The recommended approach
to do so is by using a configuration management tool, such as
[Ansible](https://docs.ansible.com/ansible/latest/user_guide/) or
[PsExec](https://theitbros.com/using-psexec-to-run-commands-remotely/), or even
a Windows GPO.

## Leaving a README.txt file

Many ransomware packages leave a README.txt file on the victim machine with an
explanation of what has occurred and instructions for paying the attacker. The
Infection Monkey will also leave a README.txt file in the target directory on
the victim machine in order to replicate this behavior.

The README.txt file informs the user that a ransomware simulation has taken
place and that they should contact their administrator. The contents of the
file can be found
[here](https://github.com/guardicore/monkey/blob/master/monkey/agent_plugins/payloads/ransomware/src/ransomware_readme.txt).

## Changing the desktop wallpaper

Infection Monkey can change the desktop wallpaper as a more conspicuous
indication that a ransomware attack has occurred. This feature is currently
only applicable to victim machines running Windows.

When this feature is enabled, the desktop background will be changed to this:

![Ransomware
wallpaper](/images/island/others/ransomware-wallpaper-downsized.png
"Ransomware wallpaper")


## See also
- [How to simulate a ransomware attack](/howtos/simulate-ransomware)
- [Ransomware tutorial](/tutorials/ransomware/)
- [Ransomware reference documentation](/reference/payloads/ransomware)
