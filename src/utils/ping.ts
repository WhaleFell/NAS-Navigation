async function pingUrl(
  url: string,
): Promise<string> {
  const start = Date.now()
  try {
    await Promise.race([
      fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-cache',
        referrerPolicy: 'no-referrer',
      }),
      new Promise(function (_, reject) {
        setTimeout(
          () =>
            reject(
              new Error('request timeout 6000'),
            ),
          6000,
        )
      }),
    ])
  } catch (err: any) {
    console.log(`${url} Ping Error:${err}`)
    return err
  }
  const end = Date.now()
  // retrue millisecond
  const delay = end - start
  console.log(`${url} Time delay: ${delay} ms`)
  return delay.toString()
}

export default pingUrl
