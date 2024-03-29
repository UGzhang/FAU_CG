﻿#include "quaternion.h"
#include <math.h>


Quaternion::Quaternion()
{
    real = 1;
    img = vec3(0);
}

Quaternion::Quaternion(vec3 axis, float angle)
{
    // TODO 7.3 a)
    // Initialize with classic axis angle rotation as defined in the lecture.
	// Change the following two lines!
	// https://en.wikipedia.org/wiki/Rotation_formalisms_in_three_dimensions -  Quaternions
    real = cos(angle/2); // qr
	img = axis * sin(angle/2);//qi or qj or qk
}



mat3 Quaternion::toMat3()
{
    // Conversion Quaternion -> mat3
    // You won't have to implement it this year :).
    mat3 Result;
    float qxx(img.x * img.x);
    float qyy(img.y * img.y);
    float qzz(img.z * img.z);
    float qxz(img.x * img.z);
    float qxy(img.x * img.y);
    float qyz(img.y * img.z);
    float qwx(real * img.x);
    float qwy(real * img.y);
    float qwz(real * img.z);

    Result[0][0] = float(1) - float(2) * (qyy +  qzz);
    Result[0][1] = float(2) * (qxy + qwz);
    Result[0][2] = float(2) * (qxz - qwy);

    Result[1][0] = float(2) * (qxy - qwz);
    Result[1][1] = float(1) - float(2) * (qxx +  qzz);
    Result[1][2] = float(2) * (qyz + qwx);

    Result[2][0] = float(2) * (qxz + qwy);
    Result[2][1] = float(2) * (qyz - qwx);
    Result[2][2] = float(1) - float(2) * (qxx +  qyy);
    return Result;
}

mat4 Quaternion::toMat4()
{
    return mat4(toMat3());
}


float Quaternion::norm() const
{
    // TODO 7.3 b)
    // Compute the L2 norm of this vector.
    return sqrt(real*real + img.x*img.x + img.y*img.y + img.z*img.z);
}

Quaternion Quaternion::normalize()
{
    // TODO 7.3 b)
    // Normalize this quaternion.
    float length = norm();
    real /= length;
    img /= length;
    return *this;
}

Quaternion Quaternion::conjugate() const
{
    // TODO 7.3 b)
	// Return the conjugate of this quaternion.
    Quaternion result;
    result.real = real;
    result.img = img * -1.0f;
    return result;
}

Quaternion Quaternion::inverse() const
{
    // TODO 7.3 b)
	// Return the inverse of this quaternion.
    float norm_2 = pow(norm(),2);
    Quaternion result;
    result.real = real / norm_2;
    result.img = img / norm_2;
    return result;
}



float dot(Quaternion x, Quaternion y)
{
    // TODO 7.3 b)
	// Compute the dot product of x and y.
    return x.real*y.real + glm::dot(x.img,y.img);
}



Quaternion operator*(Quaternion l, Quaternion r)
{
    // TODO 7.3 c)
    // Perform quaternion-quaternion multiplication as defined in the lecture.
	// Hint: You can use the glm function for vector products.
    Quaternion result;
    result.real = l.real * r.real - glm::dot(l.img, r.img);
    result.img = l.real * r.img + r.real * l.img + glm::cross(l.img,r.img);
    return result;
}

vec3 operator*(Quaternion l, vec3 r)
{
    // TODO 7.3 c)
    // Rotate the vector 'r' with the quaternion 'l'.
    // https://www.mathworks.com/help/aeroblks/quaternionrotation.html
    Quaternion v;
    v.real = 0;
    v.img = r;
    return (l.normalize().inverse() * v * l.normalize()).img;
}

Quaternion operator*(Quaternion l, float r)
{
    // TODO 7.3 c)
    // Perform quaternion-scalar multiplication.
    Quaternion result;
    result.real = r * l.real;
    result.img = r * l.img;
    return result;
}

Quaternion operator+(Quaternion l, Quaternion r)
{
    // TODO 7.3 c)
	// Return the sum of the two quaternions.
    Quaternion result;
    result.real = l.real + r.real;
    result.img = l.img + r.img;
    return result;
}



Quaternion slerp(Quaternion x, Quaternion y, float t)
{
	float epsilon = 0.00001;

    // TODO 7.3 d)
    // Spherical linear interpolation (slerp) of quaternions.

    // Compute the interpolated quaternion and return it normalized.

    Quaternion result;
    float dot_x_y = dot(x,y);
    if(dot_x_y <= 1 - epsilon){
        float angle = acos(dot_x_y);
        return x * (sin((1-t)*angle) / sin(angle)) + y * (sin(t*angle)/ sin(angle));
    }else{
        return x * (1-t) + y * t;
    }
}

std::ostream& operator<<(std::ostream &str, Quaternion r)
{
    str << "( " << r.real << "," << r.img.x << "," << r.img.y << "," << r.img.z << " )";
        return str;
}
