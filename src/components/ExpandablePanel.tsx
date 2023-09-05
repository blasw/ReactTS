import { ReactNode, useState } from 'react';
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';

interface ExpandablePanelProps {
    header?: ReactNode,
    children?: ReactNode,
}

function ExpandablePanel({header, children} : ExpandablePanelProps) {
    const [expanded, setExpanded] = useState(false);

    const handleClick = () => {
        setExpanded(!expanded);
    }

    return(
        <div className="mb-2 border rounded">
            <div className="flex p-2 justify-between items-center">
                <div className="flex flex-row items-center justify-between">
                    {header}
                </div>
                <div className="cursor-pointer" onClick={handleClick}>
                    {expanded ? <GoChevronDown size={35}/> : <GoChevronLeft size={35}/>}
                </div>
            </div>
            {expanded && <div className="p-2 border-t">{children}</div>}
        </div>
    )
}

export default ExpandablePanel;