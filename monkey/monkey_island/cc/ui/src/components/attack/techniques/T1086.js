import React from 'react';
import ReactTable from 'react-table';
import {renderMachine, renderMachineFromSystemData, ScanStatus} from './Helpers'
import MitigationsComponent from './MitigationsComponent';


class T1086 extends React.Component {

  constructor(props) {
    super(props);
  }

  static getPowershellColumnsForExploits() {
    return ([{
      Header: 'PowerShell commands used on exploited machines',
      columns: [
        {
          Header: 'Machine',
          id: 'machine',
          accessor: x => renderMachine(x.data[0].machine),
          style: {'whiteSpace': 'unset'},
          width: 160
        },
        {Header: 'Approx. Time', id: 'time', accessor: x => x.data[0].info.finished, style: {'whiteSpace': 'unset'}},
        {
          Header: 'Command',
          id: 'command',
          accessor: x => x.data[0].info.executed_cmds[0].cmd,
          style: {'whiteSpace': 'unset'}
        }
      ]
    }])
  }

  static getPowershellColumnsForPBAs() {
    return ([{
      Header: 'PBAs that used PowerShell commands or scripts',
      columns: [
        {
          Header: 'Machine',
          id: 'machine',
          accessor: x => renderMachineFromSystemData(x.machine),
          style: {'whiteSpace': 'unset'}
        },
        {
          Header: 'Information',
          id: 'information',
          accessor: x => x.info,
          style: {'whiteSpace': 'unset'}
        }
      ]
    }])
  }

  segregatePowershellDataPerCategory() {
    let exploit_category_name = 'exploit';
    let pba_category_name = 'post_breach';

    let data_from_exploits = [];
    let data_from_pbas = [];

    for (let rowIdx in this.props.data.cmds) {
      let row = this.props.data.cmds[rowIdx];
      if (row.telem_category == exploit_category_name) {
        data_from_exploits.push(row);
      }
      else if (row.telem_category == pba_category_name) {
        data_from_pbas.push(row);
      }
    }

    return [data_from_exploits, data_from_pbas]
  }

  render() {
    let segregatedData = this.segregatePowershellDataPerCategory();
    let data_from_exploits = segregatedData[0];
    let data_from_pbas = segregatedData[1];

    return (
      <div>
        <div>{this.props.data.message_html}</div>
        <br/>
        {this.props.data.status === ScanStatus.USED ?
          <div>
          <ReactTable
            columns={T1086.getPowershellColumnsForExploits()}
            data={data_from_exploits}
            showPagination={false}
            defaultPageSize={data_from_exploits.length}
          />
          <br/>
          <br/>
          <ReactTable
            columns={T1086.getPowershellColumnsForPBAs()}
            data={data_from_pbas}
            showPagination={false}
            defaultPageSize={data_from_pbas.length}
          />
          </div> : ''}
        <MitigationsComponent mitigations={this.props.data.mitigations}/>
      </div>
    );
  }
}

export default T1086;
