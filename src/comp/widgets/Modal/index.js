import { ModalBase } from './Base';
// ui comps
import Button from 'comp/ui/Button';
import './style.css';

const Modal = (props) => {
    return (
        <ModalBase>
            <div className="modal-backdrop">
                <div className='modal'>
                    <div className='modal-header'>
                        <h4>{props.title}</h4>
                    </div>
                    <div className='modal-body'>
                        {props.children}
                    </div>
                    {
                        props.footerActions && (
                            <div className='modal-actions'>
                                {props.footerActions.map((fa, i) => {
                                    return (
                                        <Button key={i} onClick={fa.action} label={fa.label} customClassName={fa.theme}/>
                                    )
                                })}
                            </div>
                        )
                    }
                </div>
            </div>
        </ModalBase>
    );
};

export default Modal;