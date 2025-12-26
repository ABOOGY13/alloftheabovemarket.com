import useSWR from "swr";

const fetcher = (url, token) => fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json());

const { data: listings } = useSWR(token ? ["/api/my-listings", token] : null, fetcher, { refreshInterval: 5000 });
const { data: raffles } = useSWR(token ? ["/api/my-raffles", token] : null, fetcher, { refreshInterval: 5000 });
const { data: tickets } = useSWR(token ? ["/api/my-tickets", token] : null, fetcher, { refreshInterval: 5000 });
