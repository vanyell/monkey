import { AGENT_OTP_ENVIRONMENT_VARIABLE } from './consts';

export default function generateLocalLinuxWget(islandIp, servers, port, username, otp) {
  const agentServers = servers.map(server => `${server}:${port}`).join(',');
  let command = `wget --no-check-certificate https://${islandIp}:${port}/api/agent-binaries/`
    + `linux -O ./monkey-linux-64; `
    + `chmod +x monkey-linux-64; `
    + `${AGENT_OTP_ENVIRONMENT_VARIABLE}=${otp} ./monkey-linux-64 m0nk3y -s ${agentServers}`;

  if (username != '') {
    command = `su - ${username} -c "${command}"`;
  }

  return command;
}
