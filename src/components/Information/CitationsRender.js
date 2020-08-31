import React from 'react';
import PropTypes from 'prop-types';

const CitationsRender = ({ information }) => {
    const { citations } = information;
    console.log(citations)

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
    let citationsToDisplay = citations.dmv_driving_history_dmv_citations_driving_history;
    return (
        <div className="row">
            <h3 className="display-3">Citations</h3>
            
            <table className="table">
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
            </table>
        </div>
    );
}
CitationsRender.propTypes = {
    information: PropTypes.object,
}
export default CitationsRender;