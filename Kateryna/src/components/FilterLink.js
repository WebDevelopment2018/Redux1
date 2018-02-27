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
const setVisibilityFilter = (filter) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    };
};
const mapDispatchToLinkProps = (dispatch,ownProps) => {
    return {
        onClick: () => {
            dispatch(
                setVisibilityFilter(ownProps.filter)
            );
        }
    };
}

const FilterLink = connect(
    mapStateToLinkProps,
    mapDispatchToLinkProps
)(Link);

export default FilterLink;