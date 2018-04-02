import React from "react";
import PropTypes from "prop-types";


export default class TestCaseList extends React.Component {

    render() {
        const cases = this.props.testcases;
        const rows = cases.map(function(c, i) {
            let progress;
            if (!c.completed) {
                progress = (
                    <span>Evaluating...</span>
                );
            } else {
                if (c.success) {
                    progress = (
                        <span>Passed <span className="glyphicon glyphicon-ok"></span></span>
                    )
                } else {
                    progress = (
                        <span>Failed <span className="glyphicon glyphicon-remove"></span></span>
                    )
                }
            }

            return (
                <tr>
                    <td>Test Case #{i}</td>
                    <td>{progress}</td>
                </tr>
            );
        });

        let successFail = {
            success: 0,
            fail: 0,
        };

        for (var testCase of cases) {
            if (testCase.completed) {
                if (testCase.success) {
                    successFail.success += 1;
                } else {
                    successFail.fail += 1;
                }
            }
        }

        successFail.success /= cases.length;
        successFail.fail /= cases.length;

        const progress = {
            successStyle: {width: Math.round(successFail.success * 100) + "%"},
            failStyle: {width: Math.round(successFail.fail * 100) + "%"},
        };

        return (
            <div className="panel panel-default">
                <div className="panel-heading">Test Cases</div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Case</th>
                            <th>Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>

                <div className="panel-footer">
                    <div className="progress">
                        <div className="progress-bar progress-bar-success" style={progress.successStyle}>
                        </div>
                        <div className="progress-bar progress-bar-danger" style={progress.failStyle}>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

};

TestCaseList.propTypes = {
    testcases: PropTypes.array,
};
