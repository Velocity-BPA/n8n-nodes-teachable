# n8n-nodes-teachable

> [Velocity BPA Licensing Notice]
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

A comprehensive n8n community node for Teachable, the leading online course platform for creators. This node enables workflow automation for course management, student enrollment, user administration, sales tracking, and webhook integrations.

![n8n](https://img.shields.io/badge/n8n-community--node-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)

## Features

- **User Management**: Create, update, delete, and retrieve student/user information
- **Course Operations**: Access course details, curriculum, and enrolled students
- **Enrollment Automation**: Automate student enrollments with pricing and expiration options
- **Transaction Tracking**: Monitor sales and refunds across courses and users
- **Coupon Management**: Create and manage discount coupons for courses
- **Lecture Progress**: Track and update lecture completion status
- **School Information**: Access school details and statistics
- **Webhook Triggers**: Receive real-time notifications for enrollments, transactions, and more

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** > **Community Nodes**
3. Click **Install**
4. Enter `n8n-nodes-teachable`
5. Click **Install**

### Manual Installation

```bash
npm install n8n-nodes-teachable
```

### Development Installation

```bash
# Clone the repository
git clone https://github.com/Velocity-BPA/n8n-nodes-teachable.git
cd n8n-nodes-teachable

# Install dependencies
npm install

# Build the project
npm run build

# Create symlink to n8n custom nodes directory
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-teachable

# Restart n8n
n8n start
```

## Credentials Setup

| Field | Description |
|-------|-------------|
| API Key | Your Teachable API key from school settings |

### Getting Your API Key

1. Log in to your Teachable school admin
2. Navigate to **Settings** > **API Keys**
3. Generate a new API key
4. Copy and paste it into the n8n credentials

## Resources & Operations

### User (Student)

| Operation | Description |
|-----------|-------------|
| Create | Create a new user |
| Get | Get user by ID |
| Get by Email | Find user by email |
| Get Many | List all users |
| Update | Update user information |
| Delete | Delete a user |
| Get Current User | Get authenticated user |

### Course

| Operation | Description |
|-----------|-------------|
| Get | Get course details |
| Get Many | List all courses |
| Get Students | List students enrolled in a course |
| Get Curriculum | Get course curriculum with sections and lectures |

### Enrollment

| Operation | Description |
|-----------|-------------|
| Create | Enroll a user in a course |
| Get | Get enrollment details |
| Get Many | List all enrollments |
| Update | Update enrollment (active status, expiration) |
| Delete | Remove an enrollment |

### Transaction

| Operation | Description |
|-----------|-------------|
| Get Many | List all transactions |
| Get for Course | Get transactions for a specific course |
| Get for User | Get transactions for a specific user |

### Coupon

| Operation | Description |
|-----------|-------------|
| Create | Create a new coupon |
| Get | Get coupon details |
| Get Many | List all coupons |
| Update | Update coupon (quantity, expiration) |
| Delete | Delete a coupon |

### Lecture

| Operation | Description |
|-----------|-------------|
| Get | Get lecture details |
| Get Many | List lectures for a course |
| Get Progress | Get lecture completion status for a user |
| Update Progress | Mark lecture as complete/incomplete |

### School

| Operation | Description |
|-----------|-------------|
| Get Info | Get school information |
| Get Stats | Get school statistics |

### Webhook

| Operation | Description |
|-----------|-------------|
| Create | Create a new webhook |
| Get Many | List all webhooks |
| Delete | Delete a webhook |

## Trigger Node

The **Teachable Trigger** node listens for real-time events from your Teachable school:

| Event | Description |
|-------|-------------|
| New Enrollment | Triggered when a user enrolls in a course |
| Enrollment Completed | Triggered when a user completes a course |
| New Transaction | Triggered when a new transaction occurs |
| Transaction Refunded | Triggered when a transaction is refunded |
| New User | Triggered when a new user signs up |
| New Comment | Triggered when a new comment is posted |

## Usage Examples

### Enroll a User in a Course

```javascript
// Using the Teachable node with Enrollment resource
{
  "resource": "enrollment",
  "operation": "create",
  "userId": 12345,
  "courseId": 67890,
  "additionalFields": {
    "price_paid": 99.99,
    "coupon_code": "WELCOME20"
  }
}
```

### Get All Students in a Course

```javascript
// Using the Teachable node with Course resource
{
  "resource": "course",
  "operation": "getStudents",
  "courseId": 67890,
  "returnAll": true
}
```

### Create a Discount Coupon

```javascript
// Using the Teachable node with Coupon resource
{
  "resource": "coupon",
  "operation": "create",
  "code": "SUMMER50",
  "discount_type": "percent",
  "discount_amount": 50,
  "additionalFields": {
    "quantity": 100,
    "expires_at": "2024-12-31T23:59:59Z"
  }
}
```

## Teachable Concepts

### Users vs Students
In Teachable, all users are stored in the same system. A "student" is simply a user who is enrolled in at least one course. The User resource in this node manages all user types.

### Enrollments
Enrollments represent the relationship between a user and a course. They track enrollment date, active status, expiration, and progress completion.

### Transactions
Transactions record all financial activity including purchases, subscriptions, and refunds. They are linked to both users and courses.

### Coupons
Coupons can apply percentage or fixed amount discounts. They can be limited to specific courses or apply school-wide.

## Pagination

All "Get Many" operations support pagination:

- **Return All**: Automatically fetches all pages of results
- **Limit**: Returns up to the specified number of results (max 100)

## Error Handling

The node handles common API errors:

| Status Code | Description |
|-------------|-------------|
| 400 | Bad request - Invalid parameters |
| 401 | Unauthorized - Invalid API key |
| 404 | Not found - Resource doesn't exist |
| 422 | Validation error - Check input data |
| 429 | Rate limited - Too many requests |
| 500 | Server error - Teachable API issue |

## Security Best Practices

- Store API keys securely in n8n credentials
- Use the principle of least privilege for API keys
- Monitor webhook endpoints for unauthorized access
- Regularly rotate API keys

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service,
or paid automation offering requires a commercial license.

For licensing inquiries:
**licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-teachable/issues)
- **Documentation**: [Teachable API Docs](https://docs.teachable.com/reference)
- **n8n Community**: [n8n Community Forum](https://community.n8n.io)

## Acknowledgments

- [Teachable](https://teachable.com) for their comprehensive API
- [n8n](https://n8n.io) for the workflow automation platform
- The n8n community for inspiration and support
