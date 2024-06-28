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


## Technical details

### How are the files encrypted?

Files are "encrypted" in place with a simple bit flip. Encrypted files are
renamed to have a file extension (`.m0nk3y` by default) appended to their
names. This is a safe way to simulate encryption since it is easy to "decrypt"
your files. You can simply perform a bit flip on the files again and rename
them to remove the appended `.m0nk3y` extension.

Flipping a file's bits is sufficient to simulate the encryption behavior of
ransomware, as the data in your files has been manipulated (leaving them
temporarily unusable). Files are then renamed with a new extension appended,
which is similar to the way that many ransomwares behave. As this is a
simulation, your security solutions should be triggered to notify you or
prevent these changes from taking place.

### Which files are encrypted?

During the ransomware simulation, attempts will be made to encrypt all regular
files with [targeted file
extensions](/reference/payloads/ransomware/#files-targeted-for-encryption) in
the configured directory. The simulation is not recursive, i.e. it will not
touch any files in sub-directories of the configured directory. The Infection
Monkey will not follow any symlinks or shortcuts.

These precautions are taken to prevent the Infection Monkey from accidentally
encrypting files that you didn't intend to encrypt.

### Leaving a README.txt file

Many ransomware packages leave a README.txt file on the victim machine with an
explanation of what has occurred and instructions for paying the attacker. The
Infection Monkey will also leave a README.txt file in the target directory on
the victim machine in order to replicate this behavior.

The README.txt file informs the user that a ransomware simulation has taken
place and that they should contact their administrator. The contents of the
file can be found
[here](https://github.com/guardicore/monkey/blob/master/monkey/agent_plugins/payloads/ransomware/src/ransomware_readme.txt).

### Changing the desktop wallpaper

Infection Monkey can change the desktop wallpaper as a more conspicuous
indication that a ransomware attack has occurred. This feature is currently
only applicable to victim machines running Windows.

When this feature is enabled, the desktop background will be changed to this:

![Ransomware
wallpaper](/images/island/others/ransomware-wallpaper-downsized.png
"Ransomware wallpaper")


### See also
- [How to simulate a ransomware attack](/howtos/simulate-ransomware)
- [Ransomware tutorial](/tutorials/ransomware/)
- [Ransomware reference documentation](/reference/payloads/ransomware)
