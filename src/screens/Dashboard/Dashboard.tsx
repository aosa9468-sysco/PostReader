import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PostCard from '../../components/PostCard'
import User from '../../components/User'
import { useAuthContext } from '../../services/userService'
import { filterPostsBySenderAndMessage, filterSendersByName, sortPostsByCreationTime } from './utils'
import { DashboardProps, HTTPResponseBody, OrderTypes, PostList } from './Dashboard.interface'
import Field from '../../components/Field'
import './dashboard.css'

const FETCH_POST_URL = 'https://api.supermetrics.com/assignment/posts'
const SEARCH_TEXT = 'from'

export const Dashboard: React.VFC<DashboardProps> = (props) => {
  const navigate = useNavigate()
  const { user, clearUser } = useAuthContext()
  const [searchParams, setSearchParams] = useSearchParams()
  const [postList, setPostList] = React.useState<PostList>({ page: 0, posts: [] })
  const [senderFilter, setSenderFilter] = React.useState('')
  const [messageFilter, setMessageFilter] = React.useState('')
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const sendersWithCount = React.useMemo(
    () =>
      Array.from(
        postList.posts.reduce<Map<string, number>>((prev, current) => {
          return prev.set(current.from_name, (prev.get(current.from_name) || 0) + 1)
        }, new Map<string, number>())
      ).sort(([nameA], [nameB]) => nameA.localeCompare(nameB)),
    [postList.posts]
  )

  React.useEffect(() => {
    let active = true

    const fetchPosts = () => {
      const url = `${FETCH_POST_URL}?sl_token=${user?.sl_token}`
      return fetch<HTTPResponseBody>(url, {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      })
    }

    ;(async () => {
      if (active) {
        const response = await fetchPosts()
        const body = await response.json()

        if (response.ok && body.data) {
          setPostList(body.data)
        } else if (body.error?.message === 'Invalid SL Token') {
          clearUser()
          navigate('/login')
        }
      }
    })()

    return () => {
      active = false
    }
  }, [navigate, setPostList, clearUser, user?.sl_token])

  const handleSort = (order: OrderTypes) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setPostList({ page: postList.page, posts: postList.posts.sort(sortPostsByCreationTime(order)) })
  }

  return (
    <Field>
      <aside className='sFields'>
        <input
          placeholder='Find User'
          aria-label='search senders'
          name='search-name'
          onChange={(event) => setSenderFilter(event.target.value ?? '')}
        />
        {sendersWithCount.filter(filterSendersByName(senderFilter)).map(([sender, count], index) => {
          return (
            <User
              key={index}
              onClick={() => {
                setSearchParams({ [SEARCH_TEXT]: sender })
                setSelectedIndex(index)
              }
              }
              sender={sender}
              postCount={count}
              index={index}
              selectedIndex={selectedIndex}
            />
          )
        })}
      </aside>
      <section style={{ flex: '1' }}>
        <Field>
          <button onClick={handleSort('ASC')} className='headerButton'>⬆</button>
          <button onClick={handleSort('DESC')} className='headerButton'>⬇</button>
          <div style={{ flexGrow: 1 }} />
          <div className='sFields'>
            <input
              placeholder='Find Post'
              aria-label='search posts from senders'
              onChange={(event) => setMessageFilter(event.target.value ?? '')}
            />
          </div>
        </Field>
        {postList.posts
          .filter(filterPostsBySenderAndMessage(searchParams.get(SEARCH_TEXT), messageFilter))
          .map((post, index) => {
            return <PostCard key={index} post={post} />
          })}
      </section>
    </Field>
  )
}

export default Dashboard;

