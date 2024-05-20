![Banner Image](./.docs/ntfy.sh%20x%20n8n.png)

# n8n-nodes-ntfy

This is an n8n community node. It lets you use [ntfy.sh](https://ntfy.sh) in your n8n workflows.

**ntfy** (pronounced _notify_) is a simple HTTP-based _pub-sub_ notification service. It allows you to send notifications to your phone or desktop via scripts from any computer, and/or using a REST API. It's infinitely flexible, and **100% free software**.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Compatibility](#compatibility)  
[Usage](#usage) <!-- delete if not using this section -->  
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

Currently, only one operation is supported to send a notification using the ntfy API.

## Compatibility

[![NPM Version (with dist tag)](https://img.shields.io/npm/v/n8n/latest?style=for-the-badge&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB3aWR0aD0iMjI4IiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDIyOCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI%2BCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjA0IDQ4QzE5Mi44MTcgNDggMTgzLjQyIDQwLjM1MTQgMTgwLjc1NiAzMEgxNTMuMjQ4QzE0Ny4zODIgMzAgMTQyLjM3NiAzNC4yNDEgMTQxLjQxMiA0MC4wMjcyTDE0MC40MjUgNDUuOTQ1NkMxMzkuNDg5IDUxLjU2NDggMTM2LjY0NiA1Ni40NTU0IDEzMi42MjYgNjBDMTM2LjY0NiA2My41NDQ2IDEzOS40ODkgNjguNDM1MiAxNDAuNDI1IDc0LjA1NDRMMTQxLjQxMiA3OS45NzI4QzE0Mi4zNzYgODUuNzU5IDE0Ny4zODIgOTAgMTUzLjI0OCA5MEgxNTYuNzU2QzE1OS40MiA3OS42NDg2IDE2OC44MTcgNzIgMTgwIDcyQzE5My4yNTUgNzIgMjA0IDgyLjc0NTIgMjA0IDk2QzIwNCAxMDkuMjU1IDE5My4yNTUgMTIwIDE4MCAxMjBDMTY4LjgxNyAxMjAgMTU5LjQyIDExMi4zNTEgMTU2Ljc1NiAxMDJIMTUzLjI0OEMxNDEuNTE2IDEwMiAxMzEuNTA0IDkzLjUxODEgMTI5LjU3NSA4MS45NDU2TDEyOC41ODggNzYuMDI3MkMxMjcuNjI0IDcwLjI0MSAxMjIuNjE4IDY2IDExNi43NTIgNjZIMTA3LjI0NEMxMDQuNTggNzYuMzUxNCA5NS4xODMgODQgODQgODRDNzIuODE3IDg0IDYzLjQyMDQgNzYuMzUxNCA2MC43NTYxIDY2SDQ3LjI0MzlDNDQuNTc5NiA3Ni4zNTE0IDM1LjE4MyA4NCAyNCA4NEMxMC43NDUyIDg0IDAgNzMuMjU0OCAwIDYwQzAgNDYuNzQ1MiAxMC43NDUyIDM2IDI0IDM2QzM1LjE4MyAzNiA0NC41Nzk2IDQzLjY0ODYgNDcuMjQzOSA1NEg2MC43NTYxQzYzLjQyMDQgNDMuNjQ4NiA3Mi44MTcgMzYgODQgMzZDOTUuMTgzIDM2IDEwNC41OCA0My42NDg2IDEwNy4yNDQgNTRIMTE2Ljc1MkMxMjIuNjE4IDU0IDEyNy42MjQgNDkuNzU5IDEyOC41ODggNDMuOTcyOEwxMjkuNTc1IDM4LjA1NDRDMTMxLjUwNCAyNi40ODE5IDE0MS41MTYgMTggMTUzLjI0OCAxOEwxODAuNzU2IDE4QzE4My40MiA3LjY0ODY0IDE5Mi44MTcgMCAyMDQgMEMyMTcuMjU1IDAgMjI4IDEwLjc0NTIgMjI4IDI0QzIyOCAzNy4yNTQ4IDIxNy4yNTUgNDggMjA0IDQ4Wk0yMDQgMzZDMjEwLjYyNyAzNiAyMTYgMzAuNjI3NCAyMTYgMjRDMjE2IDE3LjM3MjYgMjEwLjYyNyAxMiAyMDQgMTJDMTk3LjM3MyAxMiAxOTIgMTcuMzcyNiAxOTIgMjRDMTkyIDMwLjYyNzQgMTk3LjM3MyAzNiAyMDQgMzZaTTI0IDcyQzMwLjYyNzQgNzIgMzYgNjYuNjI3NCAzNiA2MEMzNiA1My4zNzI2IDMwLjYyNzQgNDggMjQgNDhDMTcuMzcyNiA0OCAxMiA1My4zNzI2IDEyIDYwQzEyIDY2LjYyNzQgMTcuMzcyNiA3MiAyNCA3MlpNOTYgNjBDOTYgNjYuNjI3NCA5MC42Mjc0IDcyIDg0IDcyQzc3LjM3MjYgNzIgNzIgNjYuNjI3NCA3MiA2MEM3MiA1My4zNzI2IDc3LjM3MjYgNDggODQgNDhDOTAuNjI3NCA0OCA5NiA1My4zNzI2IDk2IDYwWk0xOTIgOTZDMTkyIDEwMi42MjcgMTg2LjYyNyAxMDggMTgwIDEwOEMxNzMuMzczIDEwOCAxNjggMTAyLjYyNyAxNjggOTZDMTY4IDg5LjM3MjYgMTczLjM3MyA4NCAxODAgODRDMTg2LjYyNyA4NCAxOTIgODkuMzcyNiAxOTIgOTZaIiBmaWxsPSIjRUE0QjcxIi8%2BCjwvc3ZnPgo%3D&label=n8n&labelColor=%23ffffff&color=%23ea4b71)](https://n8n.io)

## Usage

_This is an optional section. Use it to help users with any difficult or confusing aspects of the node._

New to n8n? [Try it out](https://docs.n8n.io/try-it-out/) to get started.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [ntfy.sh docs](https://docs.ntfy.sh)
