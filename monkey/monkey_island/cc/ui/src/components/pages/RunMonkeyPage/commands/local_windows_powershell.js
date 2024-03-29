import {AGENT_OTP_ENVIRONMENT_VARIABLE} from './consts';

function getAgentDownloadCommand(islandIp, servers, port, otp) {
  const agentServers = servers.map(server => `${server}:${port}`).join(',');
  return `$execCmd = @"\r\n`
    + `\`$monkey=[System.IO.Path]::GetTempPath() + """monkey.exe""";\r\n`
    + `[Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12;\r\n`
    + `[System.Net.ServicePointManager]::ServerCertificateValidationCallback = {\`$true};\r\n`
    + `(New-Object System.Net.WebClient).DownloadFile('https://${islandIp}:${port}/api/agent-binaries/windows',\r\n`
    + `"""\`$monkey""");\`$env:${AGENT_OTP_ENVIRONMENT_VARIABLE}='${otp}';\r\n`
    + `Start-Process -FilePath """\`$monkey""" -ArgumentList 'm0nk3y -s ${agentServers}';\r\n`
    + `"@; \r\n`
    + `Start-Process -FilePath powershell.exe -ArgumentList $execCmd`;
}

export default function generateLocalWindowsPowershell(islandIp, servers, port, username, otp) {
  let command = getAgentDownloadCommand(islandIp, servers, port, otp)
  if (username !== '') {
    command += ` -Credential ${username}`;
  }

  return command;
}
