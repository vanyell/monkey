import React from 'react';

import MatrixComponent from "./MatrixComponent";
import Checkbox from "../ui-components/Checkbox";
import Tooltip from 'react-tooltip-lite'

class ConfigMatrixComponent extends MatrixComponent {

  renderTechnique(technique) {
    if (technique == null){
      return (<div />)
    } else {
      return (<Tooltip content={technique.description} direction="down">
        <Checkbox checked={technique.value}
                  necessary={technique.necessary}
                  name={technique.name}
                  changeHandler={this.props.change}>
          {technique.title}
        </Checkbox>
      </Tooltip>)
    }
  };
}

export default ConfigMatrixComponent;
