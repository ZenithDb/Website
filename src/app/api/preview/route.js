/* eslint-disable import/prefer-default-export */
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const data = searchParams.get('data');

  const {
    id,
    post_type: postType,
    post_status: postStatus,
    secret,
    permalink,
  } = JSON.parse(Buffer.from(data, 'base64').toString());

  if (secret !== process.env.WP_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  if (postType !== 'post') {
    return new Response('Preview functionality only works for blog posts', { status: 401 });
  }

  draftMode().enable();

  if (permalink && postStatus === 'publish') {
    redirect(`/blog/${permalink}`);
  } else {
    const redirectSearchParams = new URLSearchParams({
      id,
      status: postStatus,
    });

    redirect(`/blog/wp-draft-post-preview-page?${redirectSearchParams.toString()}`);
  }
}
