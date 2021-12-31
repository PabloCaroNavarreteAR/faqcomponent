import React, {Fragment, useState} from 'react' 
import { useRuntime } from 'vtex.render-runtime'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Collapsible } from 'vtex.styleguide'
import './style/style.css'
import { useCssHandles } from 'vtex.css-handles';
import ReactMarkdown from 'react-markdown'

const FaqComponent = (props) => {
    const runTime = useRuntime()
    const { content, title, subtitle, description, menutitle} = props;
    const [isOpen, setOpen] = useState(null);
    const [isVisible, setVisible] = useState(false);
    const isMobile = runTime.deviceInfo.isMobile;
    const CSS_HANDLES = [
        'FaqComponent',
        'FaqComponent--bigTitle',
        'FaqComponent--container',
        'FaqComponent--titleGral',
        'FaqComponent--menu',
        'FaqComponent--menu--visible',
        'FaqComponent--menu--hidden',
        'FaqComponent--menuTitle',
        'FaqComponent--menuTitle--icon',
        'FaqComponent--menuContainer',
        'FaqComponent--menuItem',
        'FaqComponent--menuItemTrigger',
        'FaqComponent--menuItemContent',
        'FaqComponent--menuItemLink',
        'FaqComponent--content',
        'FaqComponent--contentTitle',
        'FaqComponent--contentDescription',
        'FaqComponent--contentItems',
        'FaqComponent--contentItemsTitle',
        'FaqComponent--contentItem',
        'FaqComponent--contentItemTitle',
        'FaqComponent--contentItemDescription'
    ]
    const handles = useCssHandles(CSS_HANDLES)
    const handleClick = (index) => {
        setOpen(isOpen === index ? null : index)
    }
    return (
            <div className={`${handles['FaqComponent']}`}>
                <h1 className={`${handles['FaqComponent--bigTitle']}`}>{title}</h1>
                <div className={`${handles['FaqComponent--container']} flex`}>
                    {/* menu */}
                    <div className={`${handles['FaqComponent--menuContainer']}`}>
                        <h3 className={`${handles['FaqComponent--menuTitle']}`}>
                            {menutitle}
                            {
                                isMobile ?
                                    <span className={`${handles['FaqComponent--menuTitle--icon']}`} onClick={() => setVisible(!isVisible)}>{isVisible ? '-' : '+'}</span>
                                    :
                                    ''
                            }
                        </h3>
                         
                        <div className={`${handles['FaqComponent--menu']} ${isVisible ? handles['FaqComponent--menu--visible'] : handles['FaqComponent--menu--hidden']}`}>
                            {
                                content?.map((item, index) => (
                                    <div className={`${handles['FaqComponent--menuItem']}`}>
                                        {
                                            <Collapsible
                                                key={index}
                                                header={<span className={`${handles['FaqComponent--menuItemTrigger']}`}>{item.title}</span>}
                                                isOpen={isOpen === index}
                                                onClick={() => handleClick(index)}
                                                align="right"
                                            >
                                            <div className={`${handles['FaqComponent--menuItemContent']}`}>
                                                {item?.group?.map((item, index) => (
                                                    <AnchorLink 
                                                        key={index}
                                                        className={`${handles['FaqComponent--menuItemLink']}`}
                                                        href={`#${item?.title?.split(' ').join('-').split('?').join('').split('¿').join('').split('.').join('')}-${index}`}
                                                        offset='100'
                                                    >
                                                        {item?.title}
                                                    </AnchorLink>
                                                ))}
                                            </div>
                                            </Collapsible>
                                        }
                                    </div>
                                ))
                                
                            }
                        </div>
                    </div>
                    {/* content */}
                    <div className={`${handles['FaqComponent--content']}`}>
                        {subtitle?.length > 1 ?
                            <h3 className={`${handles['FaqComponent--contentTitle']}`}>{subtitle}</h3> : ''
                        }
                        {description?.length > 1 ?
                            <ReactMarkdown className={`${handles['FaqComponent--contentDescription']}`}>{description}</ReactMarkdown> : ''
                        }
                            {
                                content?.map((item, index) => (
                                    <div className={`${handles['FaqComponent--contentItems']}`}>
                                        <h3 className={`${handles['FaqComponent--contentItemsTitle']}`}>{item?.title}</h3>
                                        {
                                            item?.group?.map((item, index) => (
                                                <div className={`${handles['FaqComponent--contentItem']}`} id={`${item?.title?.split(' ').join('-').split('?').join('').split('¿').join('').split('.').join('')}-${index}`}>
                                                    <h4 className={`${handles['FaqComponent--contentItemTitle']}`}>{item?.title}</h4>
                                                    <ReactMarkdown className={`${handles['FaqComponent--contentItemDescription']}`}>{item?.content}</ReactMarkdown>
                                                </div>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                    </div>
                </div>
            </div>
    );
}
FaqComponent.getSchema = props => {
    return {
        title: 'FaqComponent',
        type: 'object',
        properties:{
            title:{
                title: 'titulo general',
                type: 'string'
            },
            subtitle:{
                title: 'Subtitulo',
                type: 'string'
            },
            description:{
                title:'descripcion',
                type:'string',
                widget: {
                    "ui:widget": "textarea"
                }
            },
            menutitle:{
                title:'menu title',
                type:'string',
                default:'menu title'
            },
            content:{
                title:'content',
                type:'array',
                items:{
                    title: 'item group',
                    type: 'object',
                    properties:{
                        title:{
                            title:'titulo del grupo',
                            type:'string'
                        },
                        group:{
                            title:'group',
                            type:'array',
                            items:{
                                title:'items',
                                type:'object',
                                properties:{
                                    title:{
                                        title:'titulo del item',
                                        type:'string',
                                    },
                                    content:{
                                        title:'contenido del item',
                                        type:'string',
                                        widget: {
                                            "ui:widget": "textarea"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
FaqComponent.defaultProps = {
    title:"Añadir titulo"
}
export default FaqComponent;