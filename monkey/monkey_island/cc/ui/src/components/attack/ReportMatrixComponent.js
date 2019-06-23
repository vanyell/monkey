import React from 'react';
import {Label} from 'react-bootstrap';

import MatrixComponent from "./MatrixComponent";
import Tooltip from 'react-tooltip-lite'

class ReportMatrixComponent extends MatrixComponent {

  statusToClassDict = {
    "UNSCANNED": "default",
    "SCANNED": "success",
    "USED": "danger"
  };

  techniqueValToClass(techVal) {
    if (this.statusToClassDict.hasOwnProperty(techVal)) {
      return this.statusToClassDict[techVal];
    } else {
      return "default";
    }
  }

  renderTechnique(technique) {
    if (technique == null){
      return (<div />)
    } else {
      return (<Tooltip content={technique.description} direction="down">
        <Label bsStyle={this.techniqueValToClass(technique.status)}>
          {technique.title}
        </Label>
      </Tooltip>)
    }
  };
}

export default ReportMatrixComponent;
