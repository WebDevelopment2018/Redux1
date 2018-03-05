import React, {Component} from "react";
import Link from "./Link";
import {connect} from 'react-redux';

const mapStateToLinkProps = (state, ownProps) => ({
    active:
    ownProps.filter ===
    state.visibilityFilter
});

const setVisibilityFilter = (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
});

const mapDispatchToLinkProps = (dispatch, ownProps) => ({
    onClick() {
        dispatch(
            setVisibilityFilter(ownProps.filter)
        );
    }
});

const FilterLink = connect(
    mapStateToLinkProps,
    mapDispatchToLinkProps
)(Link);

export default FilterLink;