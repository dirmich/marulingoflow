import sql from '../db'

export class UserService {
    static async findOrCreateByGoogle(googleId: string, email: string, nickname: string) {
        return await (sql.begin as any)(async (t: any) => {
            // 1. 이미 등록된 OAuth 공급자 확인
            const [existingProvider] = await t`
        SELECT user_id FROM auth_providers 
        WHERE provider_name = 'google' AND provider_user_id = ${googleId}
      `

            if (existingProvider) {
                const [user] = await t`SELECT id, email, nickname FROM users WHERE id = ${existingProvider.user_id}`
                return user
            }

            // 2. 이메일로 기존 사용자 확인 (다른 OAuth로 가입했을 수 있음)
            const [existingUser] = await t`SELECT id, email, nickname FROM users WHERE email = ${email}`
            let userId = existingUser?.id

            if (!userId) {
                // 3. 신규 사용자 생성
                const isAdminEmail = email === 'oldtv.cf@gmail.com';
                const role = isAdminEmail ? 'ADMIN' : 'USER';

                const [newUser] = await t`
          INSERT INTO users (email, nickname, role)
          VALUES (${email}, ${nickname}, ${role})
          RETURNING *
        ` as any;
                userId = newUser?.id
            }

            if (!userId) throw new Error('User creation failed')

            // 4. OAuth 공급자 연동
            await t`
        INSERT INTO auth_providers (user_id, provider_name, provider_user_id)
        VALUES (${userId}, 'google', ${googleId})
      `

            const [finalUser] = await t`SELECT id, email, nickname FROM users WHERE id = ${userId}`
            return finalUser
        })
    }
}
