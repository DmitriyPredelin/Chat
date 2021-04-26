import classNames from "classnames";
import React, { useState } from "react";
import { useSelector } from "react-redux";


export const WrapperPanel = (props: any) => {

    const [expanded, setExpanded] = useState(true);

    const { titleText, selector } = props;
    let panelList: Array<any> = useSelector(selector);

    const onClickExpander = () => {
        setExpanded((prev) => !prev)
    }

    let expandedStyles: string = classNames(
        "panel-list",
        { "expanded": expanded },
        { "non-expanded": !expanded },
    );

    if (props.children.length > 1) {
        return <div>Поддерживается только 1 ребенок</div>
    }

    const child = React.cloneElement(props.children,
        {
            ...props.children.props,
            panelList: panelList,
            expanded: expanded,
            expandedStyles: expandedStyles
        });

    return (
        <div className="panel">
            <div className="panel__title" onClick={onClickExpander}>
                <div className="panel__text">{titleText}</div>
                <div className="panel__counter">{panelList.length}</div>
            </div>
            {child}
            <div className="panel__delimeter"></div>
        </div>
    )
}