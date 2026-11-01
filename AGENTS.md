<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application rules
- Keep waitlist submission browser-to-Cloud through the narrow write-only database RPC, with validation in both the client schema and database constraints; this supports static hosting without exposing subscriptions or duplicate status.
- Keep privacy as a public leaf route with its own metadata; this makes the legal page independently accessible.
