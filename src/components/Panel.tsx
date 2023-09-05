import classNames from 'classnames';
import { ReactNode } from 'react';

interface PanelProps extends React.Attributes{
    children: ReactNode,
    className: string,
}

function Panel({children, className, ...rest} : PanelProps) {
    const finalClassNames = classNames('border rounded p-3 shadow bg-white w-full', className);

    return(
        <div className={finalClassNames} {...rest}>
            {children}
        </div>
    )
}

export default Panel;
