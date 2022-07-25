import { Button, Heading, View, withAuthenticator } from '@aws-amplify/ui-react'
import * as queries from '../src/graphql/queries'
import * as mutations from '../src/graphql/mutations'
import * as subscriptions from '../src/graphql/subscriptions'
import { API } from 'aws-amplify'
import { useEffect, useState } from 'react'

function Home({ signOut }) {
	const [todo, setTodo] = useState({})

	useEffect(() => {
		const subscription = API.graphql({
			query: subscriptions.onAddTodo,
		}).subscribe({
			next: ({ provider, value }) => console.log({ provider, value }),
			error: (error) => console.warn(error),
		})

		return () => {
			subscription.unsubscribe()
		}
	}, [])

	const addTodo = async () => {
		const res = await API.graphql({
			query: mutations.addTodo,
			variables: {
				input: {
					__typename: 'Todo',
					createdAt: '2022-07-24',
					updatedAt: '2022-07-24',
					name: 'First Todo',
					owner: 'a sample',
					description: 'peace out girl scout',
				},
			},
		})
		console.log(res)
		setTodo({ ...res.data.addTodo })
	}
	const getTodo = async () => {
		const res = await API.graphql({
			query: queries.getTodo,
			variables: {
				id: todo.id,
			},
		})

		console.log(res)
	}
	const updateTodo = async () => {
		const res = await API.graphql({
			query: mutations.updateTodo,
			variables: {
				input: {
					__typename: 'Todo',
					id: todo.id,
					createdAt: '2022-07-24',
					updatedAt: '2022-07-24',
					name: 'I was updated Todo',
					owner: 'a sample',
					description: 'peace out girl scout',
				},
			},
		})
		console.log(res)
	}
	const deleteTodo = async () => {
		const res = await API.graphql({
			query: mutations.deleteTodo,
			variables: {
				id: todo.id,
			},
		})
		console.log(res)
	}
	const listTodos = async () => {
		const res = await API.graphql({
			query: queries.listTodos,
		})
		console.log(res)
	}
	return (
		<View>
			<Heading level={2}>I&apos;m a protected heading</Heading>
			<Button onClick={() => addTodo()}>Add Todo</Button>
			<Button onClick={() => getTodo()}>Get Todo</Button>
			<Button onClick={() => updateTodo()}>Update Todo</Button>
			<Button onClick={() => deleteTodo()}>Delete Todo</Button>
			<Button onClick={() => listTodos()}>List Todos</Button>
			<Button onClick={signOut}>Sign Out</Button>
		</View>
	)
}

export default withAuthenticator(Home, { signUpAttributes: ['email'] })
