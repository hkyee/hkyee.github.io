/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request) {
		const url = new URL(request.url);
		if (url.pathname === '/leetcode') {
			// Query LeetCode GraphQL API
			const response = await fetch('https://leetcode.com/graphql', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query: `query {
					allQuestionsCount {
						difficulty
						count
					}
              		matchedUser(username: "Cofffy") {
                  		username
						submissionCalendar

                  		submitStats: submitStatsGlobal {
                      		acSubmissionNum {
                          		difficulty
                          		count
								submissions
                      		}
                  		}
              		}
          		}`,
				}),
			});
			const data = await response.json();

			return new Response(JSON.stringify(data), {
				headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
			});
		}
		return new Response('Hello from Cloudflare Workers!', { status: 200 });
	},
};
