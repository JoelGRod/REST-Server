import * as bcrypt from 'bcrypt';

export const encrypt = ( value: string ): string => {
    const rounds = 10;
    const salt = bcrypt.genSaltSync(rounds);
    return bcrypt.hashSync(value, salt);
}

export const compareCrypt = ( initial: string, encrypted: string ): boolean => {
    return bcrypt.compareSync( initial, encrypted );
}