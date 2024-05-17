---
title: "Tutorial 2: Ransomware"
date: 2020-05-26T20:57:10+03:00
draft: false
pre: '<i class="fab fa-graduation-cap"></i> '
weight: 2
tags: ["tutorials", "ransomware"]
---

In this tutorial, you will learn how to set up and run a ransomware scenario using Infection Monkey.
This tutorial assumes that you've completed [Tutorial 1: Hello, Monkey](../hello-monkey), since it builds off of the knowledge gained from that tutorial.

You'll learn:
- How to setup an environment for a ransomware scenario
- How to configure Infection Monkey to perform a ransomware attack
- How to observe the results of the ransomware attack

### Prerequisites
First, make sure that you have the following installed:
- `docker` and `docker-compose`

### Run the environment
Next, we'll use `docker compose` to run Infection Monkey along with our vulnerable container.

1. Download the following compose file: [docker-compose.yml](../hello-monkey/docker/docker-compose.yaml)

2. Navigate to the directory where you downloaded the file and run the following command to start the environment:

   ```
   docker compose up
   ```

Then, open a browser to [https://localhost:5000](https://localhost:5000), and login.

### Configure the vulnerable container
For this scenario, we're going to need some valuable data so that it can be held for ransom. We'll create a folder named `vault`, and we'll add a list of passwords to that vault.

{{% notice warning %}}
Infection Monkey will encrypt the contents of whichever folder we direct it to target. Therefore, when setting up a ransomware scenario, target a folder with dummy data or make sure you have a way to recover the data in the target directory.
{{% /notice %}}

Connect to the container:

```
docker exec -it --user user hello bash
```

Add a file named `passwords.txt`:
```
mkdir ~/vault
cat << EOF > ~/vault/passwords.txt
password
P@ssw0rd
supersecretpassword
EOF
```

Now let's see if we can get Infection Monkey to encrypt our data!

### Configure Infection Monkey

#### Install plugins
Our first task is to make sure we have the required plugins. We'll need to install the Ransomware plugin, and because we'll still need to exploit the container, the SSH exploiter plugin as well.

![Plugins installed](../../images/tutorials/ransomware/1-plugins-installed.jpg)

#### Tell the Monkey which exploiter to use
Make sure SSH Exploiter is enabled in the _Enabled exploiters_ list:

![Enable the SSH Exploiter](../../images/tutorials/hello-monkey/12-exploiter-enabled.jpg)

#### Tell the Monkey which machine to target
Make sure `hello` is provided as a target under _Scan target list_:

![Scan target list in the Network Analysis configuration](../../images/tutorials/hello-monkey/5-scan-target-list.jpg)

#### Tell the Monkey what credentials to use
Enter `user` for _Identity_ and `password` for _Password_:

![Credentials entered](../../images/tutorials/hello-monkey/13-credentials-input.jpg)

#### Tell the Monkey to use the Ransomware plugin
Next, we need to enable the Ransomware plugin. Select the **Payloads** tab, and enable the _Ransomware_ plugin in the _Enabled payloads_ list.

![Ransomware enabled](../../images/tutorials/ransomware/2-ransomware-enabled.jpg)

We also need to tell the Ransomware plugin which folder to hold for ransom. Select _Ransomware_ in the _Enabled payloads_ list in order to view its settings.

Since the `hello` container is linux-based, and we want to target `/home/user/vault` folder, set the _Linux target directory_ to `/home/user/vault`.

Also make sure that _Leave ransom note_ is checked.

![Ransomware configured](../../images/tutorials/ransomware/3-ransomware-configuration.jpg)

Don't forget to **Submit** the configuration!

### Run Infection Monkey
Now that we've configured Infection Monkey, let's run it!

Go to the **Run Monkey** page and run the Monkey **From Island**.

If you look at the **Infection Map**, you'll see that the `hello` container gets exploited as it did in [Tutorial 1: Hello, Monkey](../hello-monkey).

You can tell that the run has completed when a checkmark appears next to the **Infection Map** and **Security Report** in the navigation sidebar:

![Infection Monkey run completed](../../images/tutorials/hello-monkey/7-run-monkey.jpg)


Great, so the run has completed, but how do we know whether or not our ransomware succeeded?

One good place to look is the **Ransomware report**. Navigate to the **Security Reports** page, and select the **Ransomware report** tab. Then take a look at the **3. Attack** section. It lists the files that Infection Monkey was able to encrypt:

![List of files taken for ransom in ransomware report](../../images/tutorials/ransomware/4-ransomware-report.jpg)

It looks like our passwords are being held for ransom! Let's connect to the container and observe the contents of the vault:
```
docker exec -it --user user hello bash

ls -1 ~/vault
```

We'll see two files:
```
README.txt
passwords.txt.m0nk3y
```

`README.txt` is the ransom note that Infection Monkey leaves in the directory targeted by the Ransomware plugin. `passwords.txt.m0nk3y` is our password list (formerly `passwords.txt`) that Infection Monkey encrypted. You can print the contents of the file to verify that the file is indeed encrypted:

```shell
$ cat ~/vault/passwords.txt.m0nk3y
��������������ύ����������������������
```

Looks like the Monkey did its job!

{{% notice tip %}}
Infection Monkey uses a bit flip algorithm to "encrypt" files. So if you find yourself in a situation where you need to reverse the encryption, you can drop the file extension that the Monkey adds, and then re-run the ransomware simulation. This will re-flip the bits, returning the files to their original state.
{{% /notice %}}

### Review
What have we learned?
- Infection Monkey provides a Ransomware plugin that allows one to simulate a ransomware attack
- How to specify a path for Infection Monkey to target for ransom in every machine that it exploits
- The Ransomware report provides a list of all files encrypted by Infection Monkey

### Next Steps
- Try playing with the Ransomware plugin's configuration options
- Read our [Usage document on Ransomware](../../usage/ransomware-simulation)
