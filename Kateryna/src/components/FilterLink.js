import React, {Component} from "react";
import Link from "./Link";
import { connect } from 'react-redux';

const mapStateToLinkProps = (state,ownProps) => {
    return {
        active:
        ownProps.filter ===
        state.visibilityFilter
    }
};

const mapDispatchToLinkProps = (dispatch,ownProps) => {
    return {
        onClick: () => {
            dispatch({
                type: 'SET_VISIBILITY_FILTER',
                filter: ownProps.filter
            });
        }
    };
}

const FilterLink = connect(
    mapStateToLinkProps,
    mapDispatchToLinkProps
)(Link);

export default FilterLink;