import React from 'react'
import classnames from 'classnames'
import imgPdf from '../img/pdf.jpg'

const PageHtml = props => {
  return (
    <div className={classnames('wsContentFile__contentpage__preview', {'activesidebar': props.activeSidebar})}>
      <div className='wsContentFile__contentpage__preview__dloption'>
        <div className='wsContentFile__contentpage__preview__dloption__icon'>
          <i className='fa fa-download' />
        </div>

        <div className='wsContentFile__contentpage__preview__dloption__icon'>
          <i className='fa fa-file-pdf-o' />
        </div>

        <div className='wsContentFile__contentpage__preview__dloption__icon'>
          <i className='fa fa-files-o' />
        </div>
      </div>

      <div className='wsContentFile__contentpage__preview__slider'>
        <div className='wsContentFile__contentpage__preview__slider__icon'>
          <i className='fa fa-chevron-left' />
        </div>

        <div className='wsContentFile__contentpage__preview__slider__fileimg'>
          <img src={imgPdf} alt='fichier pdf' className='img-thumbnail mx-auto' />
        </div>

        <div className='wsContentFile__contentpage__preview__slider__icon'>
          <i className='fa fa-chevron-right' />
        </div>
      </div>

      <div className='wsContentFile__contentpage__preview__sidebar' onClick={props.onClickSidebar}>
        <div className='wsContentFile__contentpage__preview__sidebar__button'>
          <div className='wsContentFile__contentpage__preview__sidebar__button__icon'>
            <i className='fa fa-gear' />
          </div>

          <div className='wsContentFile__contentpage__preview__sidebar__button__title'>
            Propriétés
          </div>
        </div>

        <div className='wsContentFile__contentpage__preview__sidebar__property'>
          <div className='wsContentFile__contentpage__preview__sidebar__property__detail'>
            <div className='wsContentFile__contentpage__preview__sidebar__property__detail__size'>
              Taille : 500Ko
            </div>

            <div className='wsContentFile__contentpage__preview__sidebar__property__detail__description'>
              <label>
                Description :
              </label>

              <form className='wsContentFile__contentpage__preview__sidebar__property__detail__description__editiondesc'>
                <textarea />
                <input type='submit' className='wsContentFile__contentpage__preview__sidebar__property__detail__description__editiondesc__validate form-control' />
              </form>
            </div>

            <div className='wsContentFile__contentpage__preview__sidebar__property__detail__btndesc btn btn-primary'>
              Changer la Description
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageHtml
