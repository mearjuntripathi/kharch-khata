import "./style/user.css"

export default function User() {
    return <div className="user-container">
        <nav className="user-nav">
            <h1>User Name</h1>
            <div className="gap-div">
            <button>Borrow</button>
            <button>Give</button>
            </div>
        </nav>
        <div className="borrow-list">
                <div className="add">
                    Add Borrow
                </div>
                <div
                    className="borrow"
                    style={{ cursor: 'pointer' }}
                >
                    <span className="money-name">name</span>
                    <div className="date">date</div>
                    <div className="cost">₹ cost</div>
                </div>
                <div
                    className="borrow complete"
                    style={{ cursor: 'pointer' }}
                >
                    <span className="money-name">name</span>
                    <div className="date">date</div>
                    <div className="cost">₹ cost</div>
                </div>
        </div>
        <div className="give-list">
            <div className="add">
                Add Give
            </div>
                <div
                    className="give"
                    style={{ cursor: 'pointer' }}
                >
                    <span className="money-name">name</span>
                    <div className="date">date</div>
                    <div className="cost">₹ cost</div>
                </div>
                <div
                    className="give complete"
                    style={{ cursor: 'pointer' }}
                >
                    <span className="money-name">name</span>
                    <div className="date">date</div>
                    <div className="cost">₹ cost</div>
                </div>
        </div>
    </div>
}