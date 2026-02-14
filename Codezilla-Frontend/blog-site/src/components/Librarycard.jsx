import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { EditOutlined, DeleteOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Flex, message } from 'antd'
import { createStyles } from 'antd-style'
import { deletePost } from '../api/Api'

const { Meta } = Card

const useStyles = createStyles(({ token }) => ({
  root: {
    width: 300,
    backgroundColor: token.colorBgContainer,
    borderRadius: token.borderRadius,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: `1px solid ${token.colorBorderSecondary}`,
  },
  header: {
    borderBottom: 'none',
    paddingBottom: 8,
  },
  body: {
    paddingTop: 0,
  },
}))

const stylesCardFn = info => {
  if (info.props.variant === 'outlined') {
    return {
      root: {
        borderColor: '#696FC7',
        boxShadow: '0 2px 8px #A7AAE1',
        borderRadius: 8,
      },
      extra: {
        color: '#696FC7',
      },
      title: {
        fontSize: 16,
        fontWeight: 500,
        color: '#A7AAE1',
      },
    }
  }
}

const stylesCardMeta = {
  title: { color: '#A7AAE1' },
  description: { color: '#A7AAE1' },
}

const Librarycard = ({ post, onDeleted }) => {
  const { styles: classNames } = useStyles()
  const navigate = useNavigate()

  const handleDelete = async e => {
    e.stopPropagation()
    if (!window.confirm('Delete this post?')) return

    try {
      await deletePost(post._id)
      message.success('Post deleted')
      onDeleted(post._id)
    } catch (err) {
      message.error('Delete failed')
      console.error(err)
    }
  }

  const handleShare = e => {
    e.stopPropagation()
    const url = `${window.location.origin}/posts/${post._id}`
    navigator.clipboard.writeText(url)
    message.success('Link copied!')
  }

  const handleEdit = e => {
    e.stopPropagation()
    navigate(`/editpost/${post._id}`)
  }

  const actions = [
    <DeleteOutlined key="delete" onClick={handleDelete} />,
    <ShareAltOutlined key="share" onClick={handleShare} />,
    <EditOutlined key="edit" onClick={handleEdit} />,
  ]

  return (
    <Flex gap="middle">
      <Card
        classNames={classNames}
        actions={actions}
        styles={stylesCardFn}
        extra={
          <Link to={`/posts/${post._id}`}>
            <Button type="link" styles={{ root: { color: '#A7AAE1' } }}>
              View
            </Button>
          </Link>
        }
      >
        <Meta
          avatar={<Avatar  src="https://api.dicebear.com/9.x/rings/svg"/>}
          title={<Link to={`/posts/${post._id}`}>{post.title}</Link>}
          description={post.content?.slice(0, 22) + '...'}
          styles={stylesCardMeta}
        />
      </Card>
    </Flex>
  )
}

export default Librarycard
