# Setting Github Actions
### Setting the `vars` variable in GitHub Actions:
This setting is optional and not required, as a default value is already configured. If you wish to replace the current setting, you may do so by updating this configuration.

| Key                 | Required | Default Value       | Description                                                           |
|---------------------| -----|---------------------|-----------------------------------------------------------------------|
| `MAIL_TEST`         | △ | inf**@kuri***.ac.jp | The email address that will receive test mail when the workflow runs. |
| `MAIL_TEST_SUBJECT` | △ |                     | The title of the test email received when the workflow runs.          |
| `MAIL_TEST_BODY`    | △ |                     | The body content of the test email received when the workflow runs    |

### Auto E2E Testing
Once the setup is complete as per the above steps, the e2e testing flow will automatically run whenever you make new pull request into the **dev**, **test** or **master** branch.

### Environment variables used to the branch

| Environment | Name                     | Use branch |
|-------------|--------------------------|------------|
| `prod`      | Production               | master     |
| `test`      | Staging                  | test       |
| `dev`       | E2E test<br/>System test | dev        |

# Setting Local Test
You can override the default values by adding the following variables to your local `.env` file:

```
NEXT_PUBLIC_MAIL_TEST={email_to}
NEXT_PUBLIC_MAIL_TEST_SUBJECT={title_email}
NEXT_PUBLIC_MAIL_TEST_BODY={body_email}
```

After setting these variables, you can run the following commands:

- `npx playwright install`: Installs the necessary browsers locally.
- `npx playwright test`: Executes the tests.

You can also refer to the home website at https://playwright.dev/ for more details.