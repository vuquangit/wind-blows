import React from 'react'

const itemList = [
  {
    imagePublicId:
      'https://res.cloudinary.com/dnzsa2z7b/image/upload/v1584600341/the-wind-blows/Project%20image/31af5bda9b3b62653b2a_u5f1p4.jpg',
    title: 'Graduated from Ho Chi Minh City University of Technical Education',
    datetime: '2011-2015',
    href: 'https://hcmute.edu.vn/'
  },
  {
    imagePublicId:
      'https://res.cloudinary.com/dnzsa2z7b/image/upload/v1585111129/the-wind-blows/Project%20image/_DSC8824_nasy0t.jpg',
    title: 'Technical Staff',
    datetime: '2016-2018'
  },
  {
    imagePublicId:
      'https://res.cloudinary.com/dnzsa2z7b/image/upload/v1585110621/the-wind-blows/Project%20image/_DSC8677_qbv0tz.jpg',
    title: 'Software Developer',
    datetime: '2018-2020'
  }
]

const Page4Item = ({
  imagePublicId = '',
  title = '',
  datetime = '',
  href = ''
}) => {
  const _content = () => (
    <>
      <div className='_6cpj'>
        <div
          className='_n52'
          style={{
            backgroundImage: `url(${imagePublicId})`
          }}
        />
      </div>
      <div className='_3g34'>
        <div className='_25r4'>
          <div className='_65_q' id='u_0_1s'>
            <div
              data-hover='tooltip'
              className='_65_q _4ik4 _4ik5'
              data-tooltip-content={title}
            >
              {title}
            </div>
          </div>
        </div>
        <div className='_4m9p'>
          <div className='_4m8o'>{datetime}</div>
          {href && <div className='_4m8p'>Read More </div>}
        </div>
      </div>
    </>
  )

  return (
    <div className='_4m8n _4m8l _4ih4'>
      {href ? (
        <a
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          className='_6cpi'
        >
          {_content()}
        </a>
      ) : (
        <>{_content()}</>
      )}
    </div>
  )
}

const Page4 = () => {
  return (
    <div className='page-4'>
      {itemList.map((item, idx) => (
        <Page4Item key={idx} {...item} />
      ))}
    </div>
  )
}

export default Page4
