import { AGENT_OTP_ENVIRONMENT_VARIABLE } from './consts';

export default function generateLocalLinuxCurl(islandIp, servers, port, username, otp) {
  const agentServers = servers.map(server => `${server}:${port}`).join(',');
  let command = `curl https://${islandIp}:${port}/api/agent-binaries/linux -k `
    + `-o monkey-linux-64; `
    + `chmod +x monkey-linux-64; `
    + `${AGENT_OTP_ENVIRONMENT_VARIABLE}=${otp} ./monkey-linux-64 m0nk3y -s ${agentServers};`;

  if (username != '') {
    command = `su - ${username} -c "${command}"`;
  }

  return command;
}
