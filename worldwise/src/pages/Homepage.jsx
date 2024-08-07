import { Link } from "react-router-dom"

export default function Homepage() {
    return (
        <div>
            <h1>Homepage</h1>
            <Link to='/pricing'>Pricing</Link>
        </div>
    )
}