import React from 'react';
import PropTypes from 'prop-types';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

const CitationsRender = ({ information }) => {
    const { drivingHistory } = information;
    console.log(drivingHistory)

    const createCitationRow = (citation) => {
        return (
            <tr key={citation.crefc_citationid}>
                    <th scope="row" key={citation.crefc_citationid + "col0"}> {citation.dmv_citation_number} </th>
                    <td key={citation.crefc_citationid + "col1"}> {citation["dmv_type_of_ticket@OData.Community.Display.V1.FormattedValue"]} </td>
                    <td key={citation.crefc_citationid + "col2"}> {citation["dmv_date_received@OData.Community.Display.V1.FormattedValue"]} </td>
                    <td key={citation.crefc_citationid + "col3"}> {citation.dmv_points} </td>
                    <td key={citation.crefc_citationid + "col4"}> {citation["dmv_court@OData.Community.Display.V1.FormattedValue"]} </td>
                    <td key={citation.crefc_citationid + "col5"}> {citation.dmv_location} </td>
                </tr>
        );
    }
    let citationsToDisplay = drivingHistory.dmv_driving_history_dmv_citations_driving_history;
    return (
        <section className="main-block text-center">
            <h4 className="display-4">Citations</h4>
            <Row>
                { citationsToDisplay.length > 0 ?
                <Col>
                    <Table striped bordered>
                        <thead className="thead-dark">
                            <tr key={0}>
                                <th scope="col" key={1}>Citation #</th>
                                <th scope="col" key={2}>Ticket Type</th>
                                <th scope="col" key={3}>Date Received</th>
                                <th scope="col" key={4}>Points</th>
                                <th scope="col" key={5}>Court</th>
                                <th scope="col" key={6}>County</th>
                            </tr>
                        </thead>
                        <tbody>
                            {citationsToDisplay.map((citation) => createCitationRow(citation))}
                        </tbody>
                    </Table>
                </Col>
                :<Col>
                    <p className="lead">Congratulations! You do not have any citations in your history. We hope you continue to keep our roadways safe for everyone!</p>
                </Col>
                }   
            </Row>
        </section>
        
    );
}
CitationsRender.propTypes = {
    information: PropTypes.object,
}
export default CitationsRender;