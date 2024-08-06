---
title: "Infection Monkey AWS Execution"
draft: false
description: "Run Infection Monkey on AWS EC2 instances"
tags: ["aws", "ec2", "ssm", "agent", "run"]
pre: "<i class='fa-brands fa-aws'></i> "
---

## Description

Infection Monkey enables the simulation of various attack scenarios
across your AWS infrastructure without the requirement of any manual installation.

Executing Infection Monkey on AWS EC2 instances is facilitated by the
[AWS Systems Manager (SSM) Agent](
https://docs.aws.amazon.com/systems-manager/latest/userguide/ssm-agent.html).
Each EC2 instance has an SSM Agent installed for updating, managing, and
configuring the instance. It executes requests received from
the [AWS Systems Manager](
https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html),
and uses the [Amazon Message Delivery Service](
https://docs.aws.amazon.com/service-authorization/latest/reference/list_amazonmessagedeliveryservice.html)
to report back status and execution details.

## Prerequisites

1. Ensure that the SSM Agent is installed on the EC2 instance on which
Infection Monkey will run.
1. Ensure that the EC2 instance has the necessary IAM roles to allow
the SSM Agent to execute commands.

## Running Infection Monkey on AWS EC2 Instances

The Monkey Island can be deployed manually on any EC2 instance with a
[supported operating system](
../../reference/system-requirements/#supported-operating-systems) or using the
[Infection Monkey AMI](https://aws.amazon.com/marketplace/pp/prodview-b3oqimxzrd762).
When deployed, it will automatically detect that it is running on an
AWS instance and offer the option to run an Infection Monkey Agent on EC2 instances
having SSM Agents.

![Running Infection Monkey on EC2 Instances](
/images/island/integrations/aws/run_on_aws_ec2.png "Running Infection Monkey on EC2
Instances")
