

IntersectionResult intersectRayPlane(Ray ray, vec4 planeData) {
//    vec3 n = planeData.xyz; //normal
//    float k = planeData.w; //distance to origin

    // TODO 9.2 b)
    // Ray-Plane Intersection
    // Have a look at the definition of struct "IntersectionResult" in rt.h.
    // You can use "EPSILON" defined in rt.glsl.

    vec3 d = ray.direction;
    vec3 e = ray.origin;

    vec3 n = planeData.xyz; //normal
    float s = planeData.w; //distance to origin

    float t = (s - dot(n,e)) / dot(n,d);

    IntersectionResult result;

    if(dot(n, ray.direction) == 0){
        result.isIntersection = false;
        return noIntersection;
    }
    else result.isIntersection = true;

    result.tHit = t;
    result.hitPosition = e + t * d;
    result.epsilon = EPSILON;
    result.normal = n;

    return result;
}



IntersectionResult intersectRaySphere(Ray ray, vec4 sphereData) {
    // TODO 9.2 c)
    // Ray-Sphere Intersection
    // You can use "noIntersection" defined in rt.glsl.
    // Note that t has to be positive for the sphere to be in front of the camera:
    // Make sure that you cannot see objects behind the camera.
    vec3 c = sphereData.xyz;
    float r = sphereData.w;

    vec3 d = ray.direction;
    vec3 e = ray.origin;

    // the results quadratic equation
    float _a = dot(d,d);
    float _b = 2 * dot(d, e-c);
    float _c = dot(e-c,e-c) - r*r;

    float discriminant = _b * _b - 4 * _c;
    if(discriminant < 0){
        return noIntersection;
    }
    float t_1 = (-_b + sqrt(_b*_b - 4*_c)) / 2;
    float t_2 = (-_b - sqrt(_b*_b - 4*_c)) / 2;
    float t = 0;
    if(t_1 < 0 && t_2 < 0){
        return noIntersection;
    }else if(t_1 < t_2){
        t = t_1;
    }else {
        t = t_2;
    }

    vec3 p = e + t * d;

    return IntersectionResult(true,t,normalize(p-c),EPSILON);

}
