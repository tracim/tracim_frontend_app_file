import React from 'react'
import FileComponent from '../component/File.jsx'
import {
  handleFetchResult,
  PopinFixed,
  PopinFixedHeader,
  PopinFixedOption,
  PopinFixedContent,
  Timeline
} from 'tracim_lib'
import { timelineDebugData } from '../timelineDebugData.js'
import { FETCH_CONFIG } from '../helper.js'
import i18n from '../i18n.js'

const debug = {
  config: {
    name: 'File',
    label: {
      fr: 'Fichier',
      en: 'File'
    },
    componentLeft: 'File',
    componentRight: 'Timeline',
    customClass: 'wsContentFile',
    icon: 'fa fa-file-text-o',
    color: '#fdfdfd',
    domContainer: 'appContainer',
    mockApiUrl: 'http://localhost:3001'
  },
  loggedUser: {
    id: 5,
    username: 'Smoi',
    firstname: 'Côme',
    lastname: 'Stoilenom',
    email: 'osef@algoo.fr',
    avatar: 'https://avatars3.githubusercontent.com/u/11177014?s=460&v=4'
  },
  content: {
    id: -1,
    type: 'File',
    title: 'Test debug File',
    status: 'validated',
    version: 'version n°1',
    text: 'This is the default file content for debug purpose',
    workspace: {
      id: -1,
      title: 'Test debug workspace',
      ownerId: 5
    }
  },
  timeline: timelineDebugData
}

class File extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      appName: 'File',
      isVisible: true,
      config: props.data ? props.data.config : debug.config,
      loggedUser: props.data ? props.data.loggedUser : debug.loggedUser,
      content: props.data ? props.data.content : debug.content,
      timeline: props.data ? [] : debug.timeline,
      activeSidebar: false
    }

    document.addEventListener('appCustomEvent', this.customEventReducer)
  }

  customEventReducer = ({ detail: action }) => { // action: { type: '', data: {} }
    switch (action.type) {
      case 'File_showApp':
        this.setState({isVisible: true})
        break
      case 'File_hideApp':
        this.setState({isVisible: false})
        break
    }
  }

  async componentDidMount () {
    const { content, config } = this.state
    if (content.id === '-1') return // debug case

    const fetchResultPageHtml = await fetch(`${config.mockApiUrl}/workspace/${content.workspace.id}/content/${content.id}`, {
      ...FETCH_CONFIG,
      method: 'GET'
    })
    const fetchResultTimeline = await fetch(`${config.mockApiUrl}/workspace/${content.workspace.id}/content/${content.id}/timeline`, {
      ...FETCH_CONFIG,
      method: 'GET'
    })

    fetchResultPageHtml.json = await handleFetchResult(fetchResultPageHtml)
    fetchResultTimeline.json = await handleFetchResult(fetchResultTimeline)

    this.setState({
      content: fetchResultPageHtml.json,
      timeline: fetchResultTimeline.json
    })

    // wysiwyg()
  }

  handleClickBtnCloseApp = () => {
    this.setState({ isVisible: false })
  }

  handleChangeTitle = e => console.log('new title : ', e.target.value)

  handleClickSidebar = () => this.setState(prev => ({activeSidebar: !prev.activeSidebar}))

  render () {
    const { isVisible, loggedUser, timeline, content, config } = this.state

    if (!isVisible) return null

    return (
      <PopinFixed customClass={`${config.customClass}`}>
        <PopinFixedHeader
          customClass={`${config.customClass}`}
          icon={config.icon}
          name={content.title}
          onClickCloseBtn={this.handleClickBtnCloseApp}
          onChangeTitle={this.handleChangeTitle}
        />

        <PopinFixedOption
          customClass={`${config.customClass}`}
          onClickNewVersionBtn={this.handleClickNewVersion}
          i18n={i18n}
        />

        <PopinFixedContent customClass={`${config.customClass}__contentpage`}>
          <FileComponent
            activeSidebar={this.state.activeSidebar}
            onClickSidebar={this.handleClickSidebar}
            key={'File'}
          />

          <Timeline
            customClass={`${config.customClass}__contentpage`}
            loggedUser={loggedUser}
            timelineData={timeline}
          />
        </PopinFixedContent>
      </PopinFixed>
    )
  }
}

export default File
